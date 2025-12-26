import styles from "./LatestTransactions.module.css";
import cardStyles from "../Card/Card.module.css";
import { Card } from "../Card/Card";
import { categories } from "../../config/categories";

export function LatestTransactions({ transactions }) {
  const latest = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <Card className={`${cardStyles.card} ${styles.container}`}>
      <div className={styles.text}>
        <h2 className={styles.sectionTitle}>Transactions</h2>
        <a className={styles.btnViewAll} href="/transactions">
          View All
        </a>
      </div>

      <div className={styles.transactionList}>
        {latest.length === 0 && (
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
                {t.amount < 0 ? "-" : ""}${Math.abs(t.amount).toFixed(2)}
              </p>
              <span>{new Date(t.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
