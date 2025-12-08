import styles from "./CircularProgress.module.css";

export function CircularProgress({ percentage, spent, limit }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.round(percentage);
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={styles.chartContainer}>
      <svg width="180" height="180" className={styles.svg}>
        <circle
          className={styles.bg}
          cx="90"
          cy="90"
          r={radius}
          strokeWidth="12"
        />
        <circle
          className={styles.progress}
          cx="90"
          cy="90"
          r={radius}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className={styles.centerText}>
        <h2>{percent}%</h2>
        <p>
          ${spent} / ${limit}
        </p>
        <span>Spent balance</span>
      </div>
    </div>
  );
}
