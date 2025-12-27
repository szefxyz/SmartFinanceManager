import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Smart Finance Manager</p>
      <span>·</span>
      <a href="https://github.com/szefxyz/SmartFinanceManager" target="_blank">
        GitHub
      </a>
    </footer>
  );
}
