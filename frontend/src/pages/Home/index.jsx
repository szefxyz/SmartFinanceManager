import { LatestTransactions } from "../../components/LatestTransactions/LatestTransactions";
import { ExpenseCategories } from "../../components/ExpenseCategories/ExpenseCategories";
import { SummaryBoxes } from "../../components/SummaryBoxes/SummaryBoxes";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.left}>
        <LatestTransactions />
        <SummaryBoxes />
      </div>

      <div className={styles.right}>
        <ExpenseCategories />
      </div>
    </div>
  );
}
