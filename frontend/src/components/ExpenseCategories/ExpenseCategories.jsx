import { useEffect, useState } from "react";
import styles from "./ExpenseCategories.module.css";
import { categories } from "../../config/categories";
import { CircularProgress } from "../CircularProgress/CircularProgress";

export function ExpenseCategories() {
  const [categoryTotals, setCategoryTotals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}`
      );
      const data = await res.json();

      const totals = {};

      Object.keys(categories).forEach((cat) => {
        totals[cat] = { income: 0, expense: 0 };
      });

      data.forEach((t) => {
        if (!categories[t.category]) return;

        if (t.amount < 0) {
          totals[t.category].expense += Math.abs(t.amount);
        } else {
          totals[t.category].income += t.amount;
        }
      });

      const formatted = Object.entries(totals).map(([category, values]) => ({
        category,
        balance: values.income - values.expense,
      }));

      setCategoryTotals(formatted);
    };

    fetchData();
  }, []);

  const formatMoney = (value) => {
    const abs = Math.abs(value).toFixed(2);
    return value < 0 ? `-$${abs}` : `$${abs}`;
  };

  const income =
    categoryTotals.find((c) => c.category === "Income")?.balance || 0;

  const spent = categoryTotals
    .filter((c) => c.category !== "Income")
    .reduce((sum, c) => sum + Math.abs(Math.min(0, c.balance)), 0);

  const percentage =
    income === 0 ? 0 : Math.min(100, Math.round((spent / income) * 100));

  return (
    <section className={styles.expenseCategories}>
      <div className={styles.text}>
        <h2 className={styles.sectionTitle}>Categories Overview</h2>
      </div>
      <CircularProgress
        percentage={percentage}
        spent={spent.toFixed(2)}
        limit={income.toFixed(2)}
      />
      <div className={styles.wrapper}>
        <div className={styles.categories}>
          <ul>
            {categoryTotals.map((c) => (
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
                  {formatMoney(c.balance)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
