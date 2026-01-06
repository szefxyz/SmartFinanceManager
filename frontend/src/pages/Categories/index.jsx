import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Categories.module.css";
import cardStyles from "../../components/Card/Card.module.css";
import { categories } from "../../config/categories";
import { CategoriesDonutChart } from "../../components/CategoriesDonutChart/CategoriesDonutChart";

export function Categories() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5092/api/transaction/${user.id}`
      );
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  const totals = Object.keys(categories).reduce((acc, key) => {
    if (key !== "Default") acc[key] = 0;
    return acc;
  }, {});

  transactions.forEach((t) => {
    if (t.amount < 0 && totals[t.category] !== undefined) {
      totals[t.category] += Math.abs(t.amount);
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.categoryList}>
          {Object.entries(totals).map(([name, total]) => {
            const { Icon, hex } = categories[name] || categories.Default;

            return (
              <Card key={name} className={styles.row}>
                <div className={styles.left}>
                  <div className={styles.icon} style={{ backgroundColor: hex }}>
                    <Icon size={18} color="#fff" />
                  </div>
                  <span className={styles.name}>{name}</span>
                </div>
                <span className={styles.amount}>${total.toFixed(2)}</span>
              </Card>
            );
          })}
        </div>
        <Card className={`${cardStyles.card} ${styles.container}`}>
          <div className={styles.header}>
            <h3>Expenses by Category</h3>
          </div>
          <div className={styles.chartWrapper}>
            <CategoriesDonutChart totals={totals} />
          </div>
        </Card>
      </div>
    </div>
  );
}
