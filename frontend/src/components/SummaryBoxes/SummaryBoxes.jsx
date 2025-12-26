import { useMemo } from "react";
import styles from "./SummaryBoxes.module.css";
import { Card } from "../Card/Card";

export function SummaryBoxes({ transactions }) {
  const formatMoney = (value) =>
    `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`;

  const { income, expense, avgDailyExpense } = useMemo(() => {
    if (!transactions.length) {
      return { income: 0, expense: 0, avgDailyExpense: 0 };
    }

    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions.filter((t) => t.amount < 0);
    const expense = expenses.reduce((sum, t) => sum + t.amount, 0);

    const uniqueDays = new Set(
      expenses.map((t) => new Date(t.date).toISOString().split("T")[0])
    ).size;

    const avgDailyExpense = uniqueDays > 0 ? expense / uniqueDays : 0;

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
            {expense < 0 ? (
              <i className="bxr bx-arrow-down-right" />
            ) : (
              <i className="bxr bx-arrow-up-right" />
            )}
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
            {avgDailyExpense < 0 ? (
              <i className="bxr bx-arrow-down-right" />
            ) : (
              <i className="bxr bx-arrow-up-right" />
            )}
          </span>
        </div>
      </Card>
    </div>
  );
}
