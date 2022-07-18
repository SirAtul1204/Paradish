import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/reducers/modalReducer";
import { RootState } from "../redux/store";
import styles from "../styles/Modal-styles.module.css";
import { EColor } from "../Utils/interface";
import PrimaryButton from "./PrimaryButton";
import Title from "./Title";
import Type from "./Type";
import Image from "next/image";

const Modal = () => {
  const { isOpen, message, title, status } = useSelector(
    (state: RootState) => state.modalData
  );

  const dispatch = useDispatch();

  const getBtnContent = () => {
    switch (status) {
      case "success":
        return "OK";
      case "error":
        return "Close";
      default:
        return "";
    }
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={handleModalClose}>
      <div
        className={`${styles.modal__content} ${`border-${status}-3`}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Title content={title} variant="h2" color={status} />
        <Type content={message} color={EColor.BLACK} />
        <PrimaryButton content={getBtnContent()} action={handleModalClose} />
        <div className={styles.imgWrapper} onClick={handleModalClose}>
          <Image src="/assets/close.png" alt="close-btn" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
