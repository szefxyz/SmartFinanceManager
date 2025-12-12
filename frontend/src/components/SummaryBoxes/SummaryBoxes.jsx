import { useEffect, useState } from "react";
import styles from "./SummaryBoxes.module.css";

export function SummaryBoxes() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const load = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}`
      );
      const data = await res.json();

      const income = data
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = data
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      setTotalIncome(income);
      setTotalExpense(expense);
    };

    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <span className={styles.title}>Total Income</span>
        <h2 className={styles.value}>${totalIncome.toFixed(2)}</h2>
      </div>

      <div className={styles.box}>
        <span className={styles.title}>Total Expense</span>
        <h2 className={styles.valueNegative}>${totalExpense.toFixed(2)}</h2>
      </div>
    </div>
  );
}
