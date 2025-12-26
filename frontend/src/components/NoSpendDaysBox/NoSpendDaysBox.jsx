import { useMemo } from "react";
import { Card } from "../Card/Card";
import styles from "./NoSpendDaysBox.module.css";

export function NoSpendDaysBox({ transactions }) {
  const summary = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const spendDays = new Set(
      transactions
        .filter((t) => t.amount < 0)
        .map((t) => {
          const d = new Date(t.date);
          if (d.getMonth() === month && d.getFullYear() === year) {
            return d.toISOString().split("T")[0];
          }
          return null;
        })
        .filter(Boolean)
    );

    const noSpendDays = daysInMonth - spendDays.size;

    let status = "bad";
    if (noSpendDays >= 10) status = "good";
    else if (noSpendDays >= 5) status = "ok";

    return { noSpendDays, status };
  }, [transactions]);

  return (
    <Card className={styles.box}>
      <span className={styles.title}>No-spend days</span>

      <div className={styles.valueRow}>
        <h3 className={styles.valueNeutral}>{summary.noSpendDays} days</h3>

        <span
          className={`${styles.trend} ${
            summary.status === "good"
              ? styles.trendUp
              : summary.status === "bad"
              ? styles.trendDown
              : ""
          }`}
        >
          {summary.status === "good" && <i className="bxr bx-arrow-up-right" />}
          {summary.status === "bad" && (
            <i className="bxr bx-arrow-down-right" />
          )}
          {summary.status === "ok" && (
            <i className="bxr bx-radio-circle-marked" />
          )}
        </span>
      </div>
    </Card>
  );
}
