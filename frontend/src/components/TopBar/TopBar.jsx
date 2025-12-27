import { useMatches } from "react-router-dom";
import { Button } from "../Button/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.jsx";
import { MdAdd } from "react-icons/md";
import styles from "./TopBar.module.css";

export function TopBar() {
  const matches = useMatches();
  const current = matches.find((m) => m.handle?.title);
  const pageTitle = current?.handle?.title || "Dashboard";
  const { user } = useAuth();
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  return (
    <header className={styles.topBar}>
      <h1 className={styles.appTitle}>{pageTitle}</h1>

      <div className={styles.rightSection}>
        <Button
          href="/add-transaction"
          icon={<MdAdd />}
          iconPosition="right"
          variant="secondary"
        >
          Add transaction
        </Button>

        <ThemeToggle />

        <div className={styles.separator}></div>

        <div className={styles.userInfo}>
          <p className={styles.welcome}>Welcome back,</p>
          <span className={styles.userName}>
            {firstName} {lastName}
          </span>
        </div>
      </div>
    </header>
  );
}
