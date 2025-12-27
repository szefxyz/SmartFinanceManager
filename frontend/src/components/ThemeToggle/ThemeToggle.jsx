import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle light / dark mode"
    >
      {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}
