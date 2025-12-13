import { useEffect, useState } from "react";
import styles from "./SummaryBoxes.module.css";
import { Card } from "../Card/Card";

export function SummaryBoxes() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [avgDailySpend, setAvgDailySpend] = useState(0);

  useEffect(() => {
    const load = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}`
      );
      const data = await res.json();

      const totalIncome = data
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = data.filter((t) => t.amount < 0);

      const totalExpense = expenses.reduce(
        (sum, t) => sum + Math.abs(t.amount),
        0
      );

      const uniqueDays = new Set(
        expenses.map((t) => {
          const d = new Date(t.date);
          return d.toISOString().split("T")[0];
        })
      ).size;

      const avgDaily = uniqueDays > 0 ? totalExpense / uniqueDays : 0;

      setIncome(totalIncome);
      setExpense(totalExpense);
      setAvgDailySpend(avgDaily);
    };

    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.box}>
        <span className={styles.title}>Total Income</span>
        <h2 className={styles.value}>${income.toFixed(2)}</h2>
      </Card>

      <Card className={styles.box}>
        <span className={styles.title}>Total Expense</span>
        <h2 className={styles.valueNegative}>${expense.toFixed(2)}</h2>
      </Card>

      <Card className={styles.box}>
        <span className={styles.title}>Avg Daily Spend</span>
        <h2 className={styles.valueNegative}>${avgDailySpend.toFixed(2)}</h2>
      </Card>
    </div>
  );
}
