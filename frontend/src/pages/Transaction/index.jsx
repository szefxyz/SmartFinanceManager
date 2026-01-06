import { useEffect, useState } from "react";
import { useMatches } from "react-router-dom";
import TimeSwitcher from "../../components/TimeSwitcher/TimeSwitcher";
import { getStartDate } from "../../utils/dateFilters";
import { TransactionItem } from "../../components/TransactionItem/TransactionItem";
import styles from "./Transaction.module.css";

export function Transaction() {
  const matches = useMatches();
  const current = matches.find((m) => m.handle?.title);
  const showFilters = current?.handle?.showTimeFilters || false;

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [timeFrame, setTimeframe] = useState("Month");

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      title: transaction.title,
      amount: Math.abs(transaction.amount),
      category: transaction.category,
      date: transaction.date.slice(0, 10),
    });
  };

  const saveEdit = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editForm,
            amount:
              editForm.category === "Income"
                ? Math.abs(editForm.amount)
                : -Math.abs(editForm.amount),
          }),
        }
      );

      const updated = await res.json();

      setTransactions((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
      setEditingId(null);
    } catch {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this transaction?");
    if (!confirmed) return;

    const user = JSON.parse(localStorage.getItem("user"));
    await fetch(`http://localhost:5092/api/transaction/${user.id}/${id}`, {
      method: "DELETE",
    });

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}`
      );
      const data = await res.json();
      setTransactions(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    fetchData();
  }, []);

  const filteredTransactions = showFilters
    ? transactions.filter((t) => new Date(t.date) >= getStartDate(timeFrame))
    : transactions;

  return (
    <section className={styles.container}>
      {showFilters && (
        <TimeSwitcher value={timeFrame} onChange={setTimeframe} />
      )}

      <ul className={styles.transactionList}>
        {filteredTransactions.length === 0 ? (
          <li className={styles.noTransactions}>No transactions found</li>
        ) : (
          filteredTransactions.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              isEditing={editingId === t.id}
              editForm={editForm}
              setEditForm={setEditForm}
              onEdit={() => handleEdit(t)}
              onSave={() => saveEdit(t.id)}
              onCancel={() => setEditingId(null)}
              onDelete={() => handleDelete(t.id)}
            />
          ))
        )}
      </ul>
    </section>
  );
}
