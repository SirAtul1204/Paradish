import Image from "next/image";
import { FC, useEffect } from "react";
import styles from "../styles/CheckboxGroup-styles.module.css";

interface CheckBoxGroupProps {
  checkboxes: { label: string; isChecked: boolean }[];
  title: string;
  onChangeHandler: (s: string, checked: boolean) => void;
}

const CheckBoxGroup: FC<CheckBoxGroupProps> = ({
  checkboxes,
  title,
  onChangeHandler,
}) => {
  const handleClick = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;
    onChangeHandler(input.value, !input.checked);
  };

  return (
    <div className={styles.checkboxGroup}>
      <p className={styles.title}>{title}</p>
      <div className={styles.checkboxes}>
        {checkboxes.map((checkbox) => (
          <div className={styles.checkboxContainer} key={checkbox.label}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id={checkbox.label}
              name={title}
              checked={checkbox.isChecked}
              value={checkbox.label}
              onChange={(e) =>
                onChangeHandler(e.target.value, e.target.checked)
              }
            />
            <div
              className={`${styles.fakeCheckbox} ${
                checkbox.isChecked ? styles.fakeCheckboxActive : ""
              }`}
              id={`${checkbox.label}fc`}
              onClick={() => handleClick(checkbox.label)}
            >
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjAuMjg1IDJsLTExLjI4NSAxMS41NjctNS4yODYtNS4wMTEtMy43MTQgMy43MTYgOSA4LjcyOCAxNS0xNS4yODV6Ii8+PC9zdmc+"
                alt="checkbox"
                width="11"
                height="11"
              />
            </div>
            <label htmlFor={checkbox.label} className={styles.label}>
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
