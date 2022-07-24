import { FC, ReactNode } from "react";
import styles from "../styles/Form-styles.module.css";

interface FormProps {
  children: ReactNode;
}

const Form: FC<FormProps> = ({ children }) => {
  return <form className={styles.form}>{children}</form>;
};

export default Form;
