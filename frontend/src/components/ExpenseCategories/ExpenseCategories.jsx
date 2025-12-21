import { useEffect, useState } from "react";
import styles from "./ExpenseCategories.module.css";
import cardStyles from "../Card/Card.module.css";
import { Card } from "../Card/Card";
import { CategoryDonutChart } from "../CategoryDonutChart/CategoryDonutChart";
import { categories } from "../../config/categories";

export function ExpenseCategories() {
  const [categoriesData, setCategoriesData] = useState([]);

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
        if (totals[t.category] !== undefined) {
          totals[t.category] += t.amount;
        }
      });

      setCategoriesData(
        Object.entries(totals).map(([category, balance]) => ({
          category,
          balance,
        }))
      );
    };

    load();
  }, []);

  const categoriesDataWithColors = categoriesData
    .filter((c) => c.balance < 0)
    .sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance))
    .map((c) => ({
      ...c,
      color: categories[c.category].hex,
    }));

  return (
    <Card className={`${cardStyles.card} ${styles.container}`}>
      <div className={styles.chartWrapper}>
        <CategoryDonutChart
          categoriesData={categoriesDataWithColors}
          isAnimationActive
        />
      </div>
      <div className={styles.categories}>
        <ul>
          {categoriesDataWithColors.map((c) => (
            <li key={c.category}>
              <div className={styles.left}>
                <i
                  className={categories[c.category].icon}
                  style={{ color: categories[c.category].hex }}
                />
                {c.category}
              </div>

              <span className={`${styles.amount} ${styles.negative}`}>
                -${Math.abs(c.balance).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
