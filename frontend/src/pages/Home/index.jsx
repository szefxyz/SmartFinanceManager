import { useEffect, useState, useCallback } from "react";
import { SummaryBoxes } from "../../components/SummaryBoxes/SummaryBoxes";
import { LatestTransactions } from "../../components/LatestTransactions/LatestTransactions";
import { SavingsOverview } from "../../components/SavingsOverview/SavingsOverview";
import { NoSpendDaysBox } from "../../components/NoSpendDaysBox/NoSpendDaysBox";
import styles from "./Home.module.css";

export function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        setError("User not logged in");
        return;
      }

      const res = await fetch(
        `http://localhost:5092/api/transaction/${userId}`
      );

      if (!res.ok) throw new Error("Failed to load transactions");

      const data = await res.json();
      setTransactions(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.left}>
        <SummaryBoxes transactions={transactions} />
        <LatestTransactions transactions={transactions} />
      </div>

      <div className={styles.right}>
        <NoSpendDaysBox transactions={transactions} />
        <SavingsOverview transactions={transactions} />
      </div>
    </div>
  );
}
