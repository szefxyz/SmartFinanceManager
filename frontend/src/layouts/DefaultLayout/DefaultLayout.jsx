import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { TopBar } from "../../components/TopBar/TopBar";
import { Footer } from "../../components/Footer/Footer";
import styles from "./DefaultLayout.module.css";

export function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <TopBar />
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
