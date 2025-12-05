import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import { useState } from "react";
import styles from "./Layout.module.css";

export function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Navbar open={open} setOpen={setOpen} />

      <main
        className={`${styles.mainContent} ${
          open ? styles.active : styles.closed
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
