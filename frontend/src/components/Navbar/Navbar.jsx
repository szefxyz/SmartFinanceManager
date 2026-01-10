import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdReceiptLong,
  MdLayers,
  MdLogout,
} from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
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
        <MdAccountBalanceWallet />
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.navIcon}>
              <MdDashboard />
            </span>
            <span className={styles.tooltip}>Dashboard</span>
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.navIcon}>
              <MdReceiptLong />
            </span>
            <span className={styles.tooltip}>Transactions</span>
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.navIcon}>
              <MdLayers />
            </span>
            <span className={styles.tooltip}>Categories</span>
          </NavLink>
        </li>
      </ul>

      <ul className={styles.bottomNav}>
        <li className={styles.navItem}>
          <button className={styles.navLink} onClick={handleLogout}>
            <span className={styles.navIcon}>
              <MdLogout />
            </span>
            <span className={styles.tooltip}>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
