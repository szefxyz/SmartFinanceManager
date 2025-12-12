import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./TransactionForm.module.css";

export default function TransactionForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:5092/api/transaction/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, amount, category, date }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Transaction added!");
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Add New Transaction</h2>
        <p className={styles.description}>
          Fill in the details below to add a new expense or income record.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            minLength={2}
            maxLength={30}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit">Add Transaction</Button>
        </div>
      </form>
    </div>
  );
}
