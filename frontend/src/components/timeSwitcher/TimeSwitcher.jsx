import { useState } from "react";
import Button from "../Button/Button";
import styles from "./TimeSwitcher.module.css";

export default function TimeSwitcher({ value, onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const timeframes = ["Day", "Week", "Month", "Year"];

  return (
    <div className={styles.timeSection}>
      <div className={styles.timeSwitcher}>
        {timeframes.map((o) => (
          <Button
            key={o}
            className={value === o ? styles.active : ""}
            onClick={() => onChange(o)}
          >
            {o}
          </Button>
        ))}
      </div>

      <div className={styles.timeSwitcherMobile}>
        <button
          className={styles.mobileButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {value}
          <i
            className={`bx bx-chevron-down ${
              isDropdownOpen ? styles.rotate : ""
            }`}
          ></i>
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {timeframes.map((o) => (
              <div
                key={o}
                className={styles.dropdownItem}
                onClick={() => {
                  onChange(o);
                  setIsDropdownOpen(false);
                }}
              >
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
