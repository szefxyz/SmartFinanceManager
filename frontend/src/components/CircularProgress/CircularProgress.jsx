import styles from "./CircularProgress.module.css";

export function CircularProgress({ percentage, spent, limit }) {
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.round(percentage);
  const hasData = spent > 0;

  const offset = hasData
    ? circumference - (percent / 100) * circumference
    : circumference;

  return (
    <div className={`${styles.chartContainer} ${!hasData ? styles.empty : ""}`}>
      <svg width="160" height="160" className={styles.svg}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff8a3d" />
            <stop offset="100%" stopColor="#ff5f2e" />
          </linearGradient>
        </defs>
        <circle
          className={styles.bg}
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="7"
        />
        <circle
          className={styles.progress}
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.centerText}>
        {hasData ? (
          <>
            <h2>${spent}</h2>
            <p>spent this month</p>
            <span>of ${limit}</span>
          </>
        ) : (
          <>
            <h2>No expenses</h2>
            <p>Add your first transaction</p>
          </>
        )}
      </div>
    </div>
  );
}
