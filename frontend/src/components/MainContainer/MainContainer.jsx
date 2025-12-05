import styles from "./MainContainer.module.css";

export function MainContainer({ children }) {
  return <main className={styles.mainContainer}>{children}</main>;
}
