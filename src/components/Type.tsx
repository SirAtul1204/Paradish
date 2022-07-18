import { FC } from "react";
import styles from "../styles/Type-styles.module.css";
import { EColor, TStyle } from "../Utils/interface";

export interface TypeProps {
  content: string;
  color: TStyle;
}

const Type: FC<TypeProps> = ({ content, color }) => {
  return <p className={`${styles.type} ${color}`}>{content}</p>;
};

export default Type;
