import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import { useState } from "react";
import styles from "./Layout.module.css";
import { MainContainer } from "../MainContainer/MainContainer.jsx";
import { TopBar } from "../TopBar/TopBar.jsx";

export function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className={styles.contentWrapper}>
        <TopBar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
}
