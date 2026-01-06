import styles from "./SavingsOverview.module.css";
import cardStyles from "../Card/Card.module.css";
import { Card } from "../Card/Card";
import { SavingsDonutChart } from "../SavingsDonutChart/SavingsDonutChart";

export function SavingsOverview({ transactions, periodLabel }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + t.amount, 0);

  return (
    <Card className={`${cardStyles.card} ${styles.container}`}>
      <div className={styles.header}>
        <h3>
          Savings <span className={styles.monthLabel}>({periodLabel})</span>
        </h3>
        <p>${(income + expenses).toFixed(2)}</p>
      </div>
      <div className={styles.chartWrapper}>
        <SavingsDonutChart income={income} expenses={expenses} />
      </div>
    </Card>
  );
}
