import { useNavigate, NavLink } from "react-router-dom";
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
        <i className="bx bxs-wallet"></i>
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
            <i className={`bx bxs-dashboard ${styles.navIcon}`}></i>
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
            <i className={`bx bx-wallet-note ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Transaction</span>
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <i className={`bx bx-layers ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Expense Categories</span>
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <i className={`bx bxs-chart-line ${styles.navIcon}`}></i>
            <span className={styles.tooltip}>Analytics</span>
          </NavLink>
        </li>
      </ul>

      <ul className={styles.bottomNav}>
        <li className={styles.navItem}>
          <NavLink onClick={handleLogout} className={styles.navLink}>
            <i
              className={`bx bx-arrow-out-right-square-half ${styles.navIcon}`}
            ></i>
            <span className={styles.tooltip}>Log Out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
