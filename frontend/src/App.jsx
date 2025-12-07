import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import styles from "./App.module.css";

export default function App() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.appContainer}>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Wyloguj się
      </button>
      <Layout />
    </div>
  );
}
