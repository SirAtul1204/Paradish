import { FC } from "react";
import styles from "../styles/Type-styles.module.css";

export interface TypeProps {
  content: string;
  color: "black" | "white";
}

const Type: FC<TypeProps> = ({ content, color }) => {
  return <p className={`${styles.type} ${color}`}>{content}</p>;
};

export default Type;
