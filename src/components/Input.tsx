import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/Input-styles.module.css";
import basicValidator from "../Utils/basicValidator";

export interface InputProps {
  value: string;
  modifier: (e: any) => void;
  type: "text" | "number" | "email" | "password";
  content: string;
  validator?: (data: string) => [boolean, string | undefined];
  required?: boolean;
  isEqualTo?: string;
}

const Input: FC<InputProps> = ({
  type,
  content,
  validator,
  value,
  modifier,
  required,
  isEqualTo,
}) => {
  const tempArr = content.split(" ");
  const id = tempArr.join("_");

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOnBlur = () => {
    if (validator) {
      const [isValid, errorMsg] = validator(value);
      setIsValid(isValid);
      if (errorMsg) setErrorMsg(errorMsg);
      else setErrorMsg(null);
    } else if (isEqualTo) {
      setIsValid(value === isEqualTo);
      setErrorMsg(value === isEqualTo ? null : "Passwords don't match");
    } else if (type !== "password") {
      setIsValid(basicValidator(value));
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {content} {required ? "*" : ""}
      </label>
      <input
        type={type}
        id={id}
        className={`${styles.input} ${
          isValid || isValid === null ? styles.success : styles.error
        }`}
        placeholder={content}
        value={value}
        onChange={modifier}
        required={required}
        onBlur={handleOnBlur}
      />
      {errorMsg && <p className={styles.errorMsg}>&#42; {errorMsg}</p>}
    </div>
  );
};

export default Input;
