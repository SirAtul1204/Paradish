import { FC, useEffect, useRef } from "react";
import styles from "../styles/PrimaryButton-styles.module.css";
interface PrimaryButtonProps {
  content: string;
  action: (e?: any) => void;
  variant?: "normal" | "big";
  type?: "submit" | "button";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  content,
  action,
  variant = "normal",
  type = "button",
}) => {
  const btn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    switch (variant) {
      case "normal":
        btn.current!.style.transform = "scale(1)";
        break;
      case "big":
        btn.current!.style.transform = "scale(1.1)";
        break;
      default:
        break;
    }
  }, [btn, variant]);

  return (
    <button type={type} onClick={action} className={`${styles.link}`} ref={btn}>
      {content}
    </button>
  );
};

export default PrimaryButton;
