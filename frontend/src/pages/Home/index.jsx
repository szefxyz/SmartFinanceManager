import { useEffect, useState, useCallback, useMemo } from "react";
import { SummaryBoxes } from "../../components/SummaryBoxes/SummaryBoxes";
import { LatestTransactions } from "../../components/LatestTransactions/LatestTransactions";
import { SavingsOverview } from "../../components/SavingsOverview/SavingsOverview";
import { NoSpendDaysBox } from "../../components/NoSpendDaysBox/NoSpendDaysBox";
import { getStartDate } from "../../utils/dateFilters";
import styles from "./Home.module.css";

function getCurrentPeriodLabel() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFrame] = useState("Month");

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
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

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

  const filteredTransactions = useMemo(() => {
    const start = getStartDate(timeFrame);
    const now = new Date();

    return transactions.filter((t) => {
      const d = new Date(t.date);
      return d >= start && d <= now;
    });
  }, [transactions, timeFrame]);

  if (loading) return <p className={styles.loading}>Loading dashboard...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.periodInfo}>
        This month · {getCurrentPeriodLabel()}
      </div>

      <div className={styles.left}>
        <SummaryBoxes transactions={filteredTransactions} />
        <LatestTransactions transactions={filteredTransactions} />
      </div>

      <div className={styles.right}>
        <NoSpendDaysBox transactions={filteredTransactions} />
        <SavingsOverview
          transactions={filteredTransactions}
          periodLabel={getCurrentPeriodLabel()}
        />
      </div>
    </div>
  );
}
