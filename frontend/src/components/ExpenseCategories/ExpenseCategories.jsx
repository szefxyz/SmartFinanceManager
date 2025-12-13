import { useEffect, useState } from "react";
import styles from "./ExpenseCategories.module.css";
import cardStyles from "../Card/Card.module.css";
import { Card } from "../Card/Card";
import { CircularProgress } from "../CircularProgress/CircularProgress";
import { categories } from "../../config/categories";

export function ExpenseCategories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}`
      );
      const tx = await res.json();

      const totals = {};
      Object.keys(categories).forEach((c) => (totals[c] = 0));

      tx.forEach((t) => {
        totals[t.category] += t.amount;
      });

      setData(
        Object.entries(totals).map(([category, balance]) => ({
          category,
          balance,
        }))
      );
    };

    load();
  }, []);

  const income = data.find((c) => c.category === "Income")?.balance || 0;

  const spent = data
    .filter((c) => c.balance < 0)
    .reduce((sum, c) => sum + Math.abs(c.balance), 0);

  return (
    <Card className={`${cardStyles.card} ${styles.container}`}>
      <div className={styles.chartWrapper}>
        <CircularProgress
          percentage={income ? (spent / income) * 100 : 0}
          spent={spent.toFixed(2)}
          limit={income.toFixed(2)}
        />
      </div>

      <div className={styles.categories}>
        <ul>
          {data.map((c) => (
            <li key={c.category}>
              <div className={styles.left}>
                <i
                  className={`${categories[c.category].icon} ${
                    styles[categories[c.category].colorClass]
                  }`}
                />
                {c.category}
              </div>

              <span
                className={`${styles.amount} ${
                  c.balance < 0 ? styles.negative : styles.positive
                }`}
              >
                ${Math.abs(c.balance).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
