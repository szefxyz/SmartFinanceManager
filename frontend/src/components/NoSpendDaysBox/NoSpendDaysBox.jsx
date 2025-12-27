import { useMemo } from "react";
import { Card } from "../Card/Card";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdRadioButtonChecked,
} from "react-icons/md";
import styles from "./NoSpendDaysBox.module.css";

export function NoSpendDaysBox({ transactions }) {
  const summary = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate(); // np. 27

    const spendDays = new Set(
      transactions
        .filter((t) => t.amount < 0)
        .map((t) => {
          const d = new Date(t.date);

          if (d.getFullYear() === year && d.getMonth() === month) {
            // lokalna data YYYY-MM-DD
            return d.toLocaleDateString("en-CA");
          }

          return null;
        })
        .filter(Boolean)
    );

    // liczymy tylko dni, które już minęły
    const noSpendDays = Math.max(0, today - spendDays.size);

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
          {summary.status === "good" && <MdTrendingUp />}
          {summary.status === "bad" && <MdTrendingDown />}
          {summary.status === "ok" && <MdRadioButtonChecked />}
        </span>
      </div>
    </Card>
  );
}
