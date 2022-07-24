import { FC } from "react";
import styles from "../styles/Title-styles.module.css";

interface TitleProps {
  content: string;
  variant: "h1" | "h2";
  color: "black" | "white" | "success" | "error" | "info";
}

const Title: FC<TitleProps> = ({ content, variant, color }) => {
  const className = `${styles.title} ${styles[variant]} ${color}`;
  let jsx = null;
  switch (variant) {
    case "h1":
      jsx = <h1 className={className}>{content}</h1>;
      break;
    case "h2":
      jsx = <h2 className={className}>{content}</h2>;
      break;
    default:
      jsx = null;
      break;
  }
  return jsx;
};

export default Title;
