import { FC } from "react";
import styles from "../styles/Title-styles.module.css";

interface TitleProps {
  content: string;
  variant: "h1" | "h2";
}

const Title: FC<TitleProps> = ({ content, variant }) => {
  let jsx = null;
  switch (variant) {
    case "h1":
      jsx = <h1 className={`${styles.title} ${styles.h1}`}>{content}</h1>;
      break;
    case "h2":
      jsx = <h2 className={`${styles.title} ${styles.h2}`}>{content}</h2>;
      break;
    default:
      jsx = <></>;
      break;
  }
  return jsx;
};

export default Title;
