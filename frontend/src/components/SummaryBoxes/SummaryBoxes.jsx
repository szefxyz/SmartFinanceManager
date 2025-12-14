import { useEffect, useState } from "react";
import styles from "./SummaryBoxes.module.css";
import { Card } from "../Card/Card";

export function SummaryBoxes() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [avgDailySpend, setAvgDailySpend] = useState(0);

  const formatMoney = (value) =>
    `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`;

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

      const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

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

        <div className={styles.valueRow}>
          <h2 className={styles.valueNeutral}>{formatMoney(expense)}</h2>

          <span
            className={`${styles.trend} ${
              expense < 0 ? styles.trendDown : styles.trendUp
            }`}
          >
            {expense < 0 ? (
              <i className="bxr  bx-arrow-down-right"></i>
            ) : (
              <i className="bxr  bx-arrow-up-right"></i>
            )}
          </span>
        </div>
      </Card>

      <Card className={styles.box}>
        <span className={styles.title}>Avg Daily Spend</span>

        <div className={styles.valueRow}>
          <h2 className={styles.valueNeutral}>{formatMoney(avgDailySpend)}</h2>

          <span
            className={`${styles.trend} ${
              avgDailySpend < 0 ? styles.trendDown : styles.trendUp
            }`}
          >
            {avgDailySpend < 0 ? (
              <i className="bxr  bx-arrow-down-right"></i>
            ) : (
              <i className="bxr  bx-arrow-up-right"></i>
            )}
          </span>
        </div>
      </Card>
    </div>
  );
}
