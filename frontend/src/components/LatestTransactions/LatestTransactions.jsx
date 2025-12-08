import styles from "./LatestTransactions.module.css";
import { Button } from "../Button/Button";

export function LatestTransactions() {
  return (
    <section className={styles.latestTransactions}>
      <div className={styles.text}>
        <h2 className={styles.sectionTitle}>Latest transactions</h2>
        <Button href="/payments">View All</Button>
      </div>
      <div className={styles.transactionList}>
        <div className={styles.transactionItem}>
          <div className={styles.transactionDetails}>
            <i className="bx bx-video-cinema"></i>
            <div className={styles.transactionInfo}>
              <h3 className={styles.transactionTitle}>Netflix</h3>
              <span className={styles.transactionAccount}>Current account</span>
            </div>
          </div>
          <div className={styles.transactionAmount}>
            <p>- $14.45</p>
            <span>02.12</span>
          </div>
        </div>

        <div className={styles.transactionItem}>
          <div className={styles.transactionDetails}>
            <i className="bx bx-shopping-bag"></i>
            <div className={styles.transactionInfo}>
              <h3 className={styles.transactionTitle}>Shopping</h3>
              <span className={styles.transactionAccount}>Current account</span>
            </div>
          </div>
          <div className={styles.transactionAmount}>
            <p>- $201.45</p>
            <span>05.12</span>
          </div>
        </div>

        <div className={styles.transactionItem}>
          <div className={styles.transactionDetails}>
            <i className="bx bx-shopping-bag"></i>
            <div className={styles.transactionInfo}>
              <h3 className={styles.transactionTitle}>Shopping</h3>
              <span className={styles.transactionAccount}>Current account</span>
            </div>
          </div>
          <div className={styles.transactionAmount}>
            <p>$501.45</p>
            <span>25.11</span>
          </div>
        </div>
      </div>
    </section>
  );
}
