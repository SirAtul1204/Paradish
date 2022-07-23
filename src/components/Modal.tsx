import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/reducers/modalReducer";
import { RootState } from "../redux/store";
import styles from "../styles/Modal-styles.module.css";
import PrimaryButton from "./PrimaryButton";
import Title from "./Title";
import Type from "./Type";
import Image from "next/image";
import { useEffect, useState } from "react";

const Modal = () => {
  const { isOpen, message, title, status } = useSelector(
    (state: RootState) => state.modalData
  );

  const [icon, setIcon] = useState<{ src: string; alt: string }>({
    src: "/assets/success.png",
    alt: "success",
  });

  const dispatch = useDispatch();

  const getBtnContent = () => {
    switch (status) {
      case "success":
        return "OK";
      case "error":
        return "Close";
      case "info":
        return "OK";
      default:
        return "";
    }
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    switch (status) {
      case "success":
        setIcon({ src: "/assets/success.png", alt: "success" });
        break;
      case "error":
        setIcon({ src: "/assets/error.png", alt: "error" });
        break;
      case "info":
        setIcon({ src: "/assets/info.png", alt: "info" });
        break;
      default:
        setIcon({ src: "", alt: "" });
    }
  }, [status]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={handleModalClose}>
      <div
        className={`${styles.modal__content} ${`border-${status}-3`}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconWrapper}>
          <Image src={icon.src} alt={icon.alt} layout="fill" />
        </div>
        <Title content={title} variant="h2" color={status} />
        <Type content={message} color="black" />
        <PrimaryButton content={getBtnContent()} action={handleModalClose} />
        <div className={styles.imgWrapper} onClick={handleModalClose}>
          <Image src="/assets/close.png" alt="close-btn" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
