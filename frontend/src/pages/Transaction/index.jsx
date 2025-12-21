import { useEffect, useState } from "react";
import { useMatches } from "react-router-dom";
import TimeSwitcher from "../../components/TimeSwitcher/TimeSwitcher";
import { categories } from "../../config/categories";
import { getStartDate } from "../../utils/dateFilters";
import styles from "./Transaction.module.css";

export function Transaction() {
  const matches = useMatches();
  const current = matches.find((m) => m.handle?.title);
  const showFilters = current?.handle?.showTimeFilters || false;

  const [transactions, setTransactions] = useState([]);
  const [timeFrame, setTimeframe] = useState("Week");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await fetch(
          `http://localhost:5092/api/transaction/${user.id}`
        );

        if (!res.ok) {
          setError("Failed to load transactions");
          return;
        }

        const data = await res.json();

        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(sorted);
      } catch {
        setError("Server error");
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = showFilters
    ? transactions.filter((t) => new Date(t.date) >= getStartDate(timeFrame))
    : transactions;

  return (
    <>
      <section className={styles.container}>
        {showFilters && (
          <TimeSwitcher value={timeFrame} onChange={setTimeframe} />
        )}

        {error && <p className={styles.error}>{error}</p>}
        {!error && filteredTransactions.length === 0 && (
          <p className={styles.noTransactions}>You have no transactions yet.</p>
        )}

        <ul className={styles.transactionList}>
          {filteredTransactions.map((t) => (
            <li key={t.id} className={styles.transactionItem}>
              <div className={styles.transactionDetails}>
                <div className={styles.icon}>
                  <i
                    className={
                      categories[t.category]?.icon || categories.Default.icon
                    }
                  ></i>
                </div>
                <div className={styles.transactionInfo}>
                  <p className={styles.transactionTitle}>{t.title}</p>
                  <span className={styles.transactionCategory}>
                    {t.category}
                  </span>
                </div>
              </div>

              <div className={styles.transactionMeta}>
                <span
                  className={
                    t.amount < 0
                      ? styles.transactionAmountNegative
                      : styles.transactionAmountPositive
                  }
                >
                  {t.amount < 0 ? "- " : "+ "}${Math.abs(t.amount)}
                </span>

                <span className={styles.transactionDate}>
                  {new Date(t.date).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
