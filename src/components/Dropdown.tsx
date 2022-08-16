import { Role } from "@prisma/client";
import { ChangeEvent, FC } from "react";
import styles from "../styles/Dropdown-styles.module.css";

interface DropdownProps {
  label: string;
  options: string[];
  value?: Role;
  onSelect: (value?: Role) => void;
}

const Dropdown: FC<DropdownProps> = ({ label, options, value, onSelect }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onSelect(e.target.value as Role)}
      >
        <option className={styles.option} disabled selected>
          Select
        </option>
        {options.map((option) => (
          <option className={styles.option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
