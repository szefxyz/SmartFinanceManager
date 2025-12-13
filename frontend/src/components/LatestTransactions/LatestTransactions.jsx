import { useEffect, useState } from "react";
import styles from "./LatestTransactions.module.css";
import cardStyles from "../Card/Card.module.css";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { categories } from "../../config/categories";

export function LatestTransactions() {
  const [latest, setLatest] = useState([]);
  const [error, setError] = useState("");

  const fetchLatest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        setError("User ID missing in localStorage");
        return;
      }

      const res = await fetch(
        `http://localhost:5092/api/transaction/${userId}`
      );

      if (!res.ok) {
        setError("Failed to load transactions");
        return;
      }

      const data = await res.json();

      const parseCustomDate = (str) => {
        const [day, month, year] = str.split(".");
        return new Date(`${year}-${month}-${day}`);
      };

      const sorted = data.sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt)
          : parseCustomDate(a.date);
        const dateB = b.createdAt
          ? new Date(b.createdAt)
          : parseCustomDate(b.date);

        return dateB - dateA;
      });

      setLatest(sorted.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <Card className={`${cardStyles.card} ${styles.container}`}>
      <div className={styles.text}>
        <h2 className={styles.sectionTitle}>Latest transactions</h2>
        <Button href="/transactions">View All</Button>
      </div>

      <div className={styles.transactionList}>
        {error && <p className={styles.error}>{error}</p>}

        {!error && latest.length === 0 && (
          <p className={styles.noTransactions}>You have no transactions yet.</p>
        )}

        {latest.map((t) => (
          <div key={t.id} className={styles.transactionItem}>
            <div className={styles.transactionDetails}>
              <i
                className={
                  categories[t.category]?.icon || categories.Default.icon
                }
              ></i>
              <div className={styles.transactionInfo}>
                <h3 className={styles.transactionTitle}>{t.title}</h3>
                <span className={styles.transactionAccount}>{t.category}</span>
              </div>
            </div>

            <div className={styles.transactionAmount}>
              <p
                className={`${styles.amount} ${
                  t.amount < 0 ? styles.negative : styles.positive
                }`}
              >
                {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount)}
              </p>
              <span>{new Date(t.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
