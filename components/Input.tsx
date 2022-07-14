import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/Input-styles.module.css";
import basicValidator from "../Utils/basicValidator";

interface InputProps {
  value: string;
  modifier: (e: any) => void;
  type: "text" | "number" | "email" | "password";
  content: string;
  validator?: (data: string) => boolean;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  type,
  content,
  validator,
  value,
  modifier,
  required,
}) => {
  const tempArr = content.split(" ");
  const id = tempArr.join("_");

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIsValid(validator ? validator(value) : basicValidator(value));
  }, [validator, value]);

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {content} {required ? "*" : ""}
      </label>
      <input
        type={type}
        id={id}
        className={`${styles.input} ${isValid ? styles.success : styles.error}`}
        placeholder={content}
        ref={inputRef}
        value={value}
        onChange={modifier}
        required={required}
      />
    </div>
  );
};

export default Input;
