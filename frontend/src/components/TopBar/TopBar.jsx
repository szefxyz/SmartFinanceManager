import { useMatches } from "react-router-dom";
import { Button } from "../Button/Button.jsx";
import styles from "./TopBar.module.css";

export function TopBar() {
  const matches = useMatches();
  const current = matches.find((m) => m.handle?.title);
  const pageTitle = current?.handle?.title || "Dashboard";

  return (
    <header className={styles.topBar}>
      <h1 className={styles.appTitle}>{pageTitle}</h1>

      <div className={styles.rightSection}>
        <Button
          icon={<i className="bx bx-plus"></i>}
          iconPosition="right"
          variant="secondary"
        >
          Add transaction
        </Button>

        <div className={styles.separator}></div>

        <div className={styles.userInfo}>
          <p className={styles.welcome}>Welcome back,</p>
          <span className={styles.userName}>Lorem Ipsum</span>
        </div>
      </div>
    </header>
  );
}
