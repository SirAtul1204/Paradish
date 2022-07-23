import { FC } from "react";
import styles from "../styles/StatusButton-styles.module.css";

interface StatusButtonProps {
  content: string;
  action: (e?: any) => void;
  status: "error" | "success" | "info";
}

const StatusButton: FC<StatusButtonProps> = ({ content, status, action }) => {
  return (
    <button className={`${styles.btn} ${styles[status]}`} onClick={action}>
      {content}
    </button>
  );
};

export default StatusButton;
