import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./TransactionForm.module.css";
import { presets } from "../../config/presets.js";
import { categoryList } from "../../config/categories.js";

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

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const finalAmount =
      category === "Income"
        ? Math.abs(Number(amount))
        : -Math.abs(Number(amount));

    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:5092/api/transaction/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            amount: finalAmount,
            category,
            date,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to add transaction");
        return;
      }

      setSuccess("Transaction added!");
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    } catch {
      setError("Server error.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>New transaction</h2>
        <p className={styles.description}>
          Fill in the details below to add a new expense or income record.
        </p>
      </div>

      <form className={styles.formGrid} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.leftColumn}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              minLength={2}
              maxLength={30}
              placeholder="e.g. Grocery shopping, Salary, Uber"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Amount</label>

            <div className={styles.amountInputWrapper}>
              <span className={styles.currency}>$</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className={styles.presets}>
              {presets.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.preset} ${
                    Number(amount) === value ? styles.active : ""
                  }`}
                  onClick={() => setAmount(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.field}>
            <label>Category</label>

            <div className={styles.categoryGrid}>
              {categoryList.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`${styles.categoryItem} ${
                    category === c.key ? styles.active : ""
                  }`}
                  onClick={() => setCategory(c.key)}
                >
                  <i className={c.icon}></i>
                  <span>{c.key}</span>
                </button>
              ))}
            </div>
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
            <Button
              className={!amount ? styles.disabled : ""}
              type="submit"
              disabled={!amount}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
