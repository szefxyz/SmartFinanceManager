import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.sidebarContainer}>
      <div className={styles.sidebarHeader}>
        <i className={`bx bxs-wallet`}></i>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-dashboard ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Dashboard</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/transactions">
            <i className={`bx bx-wallet-note ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Transaction</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bx bx-layers ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Expense Categories</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/">
            <i className={`bx bxs-edit ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Add Expense</span>
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
          <a onClick={handleLogout}>
            <i
              className={`bx bx-arrow-out-right-square-half ${styles.navIcon}`}
            ></i>
            <span onClick={handleLogout} className={styles.tooltip}>
              Log Out
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
