import styles from "./ExpenseCategories.module.css";

export function ExpenseCategories() {
  return (
    <section className={styles.expenseCategories}>
      <div className={styles.text}>
        <h2 className={styles.sectionTitle}>Expense Categories</h2>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.categories}>
          <ul>
            <li>
              <div className={styles.left}>
                <i className={`bx bx-pizza ${styles.food}`}></i>
                Food
              </div>
              <span className={styles.amount}>- $324.30</span>
            </li>

            <li>
              <div className={styles.left}>
                <i className={`bx bx-basket ${styles.shopping}`}></i>
                Shopping
              </div>
              <span className={styles.amount}>- $216.80</span>
            </li>

            <li>
              <div className={styles.left}>
                <i className={`bx bx-education ${styles.education}`}></i>
                Education
              </div>
              <span className={styles.amount}>- $118.00</span>
            </li>

            <li>
              <div className={styles.left}>
                <i className={`bx bx-car ${styles.transport}`}></i>
                Transport
              </div>
              <span className={styles.amount}>- $98.00</span>
            </li>

            <li>
              <div className={styles.left}>
                <i className={`bx bx-film ${styles.entertainment}`}></i>
                Entertainment
              </div>
              <span className={styles.amount}>- $85.60</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
