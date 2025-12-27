import { useMemo } from "react";
import styles from "./SummaryBoxes.module.css";
import { Card } from "../Card/Card";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

export function SummaryBoxes({ transactions }) {
  const formatMoney = (value) =>
    `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`;

  const { income, expense, avgDailyExpense } = useMemo(() => {
    if (!transactions.length) {
      return { income: 0, expense: 0, avgDailyExpense: 0 };
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysSoFar = now.getDate();

    const currentMonthTx = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });

    const income = currentMonthTx
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = currentMonthTx
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const avgDailyExpense = daysSoFar > 0 ? expense / daysSoFar : 0;

    return { income, expense, avgDailyExpense };
  }, [transactions]);

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
            {expense < 0 ? <MdTrendingDown /> : <MdTrendingUp />}
          </span>
        </div>
      </Card>

      <Card className={styles.box}>
        <span className={styles.title}>Avg Daily Spend</span>

        <div className={styles.valueRow}>
          <h2 className={styles.valueNeutral}>
            {formatMoney(avgDailyExpense)}
          </h2>

          <span
            className={`${styles.trend} ${
              avgDailyExpense < 0 ? styles.trendDown : styles.trendUp
            }`}
          >
            {avgDailyExpense < 0 ? <MdTrendingDown /> : <MdTrendingUp />}
          </span>
        </div>
      </Card>
    </div>
  );
}
