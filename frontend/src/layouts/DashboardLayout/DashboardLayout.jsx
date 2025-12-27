import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { TopBar } from "../../components/TopBar/TopBar";
import styles from "./DashboardLayout.module.css";
import { Footer } from "../../components/Footer/Footer";

export function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className={styles.dashboard}>
        <div className={styles.dashboardInner}>
          <TopBar />
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
