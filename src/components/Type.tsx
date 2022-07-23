import { FC } from "react";
import styles from "../styles/Type-styles.module.css";

export interface TypeProps {
  content: string;
  color: "black" | "white";
  weight?: "normal" | "bold";
}

const Type: FC<TypeProps> = ({ content, color, weight }) => {
  return (
    <p
      className={`${styles.type} ${color}`}
      style={{ fontWeight: !weight || weight === "normal" ? "400" : "600" }}
    >
      {content}
    </p>
  );
};

export default Type;
