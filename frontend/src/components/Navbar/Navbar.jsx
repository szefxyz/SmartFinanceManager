import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.sidebarContainer}>
      <div className={styles.sidebarHeader}>
        <i className={`bx bxs-wallet ${styles.toggleButton}`}></i>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-dashboard ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Dashboard</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-chart-line ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Analytics</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-chart-line ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Analytics</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-chart-line ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Analytics</span>
          </a>
        </li>
      </ul>

      <ul className={styles.bottomNav}>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-user ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Profile</span>
          </a>
        </li>

        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-cog ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Sign In</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
