import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../redux/reducers/toastReducer";
import { RootState } from "../redux/store";
import styles from "../styles/Toast-styles.module.css";
import Type from "./Type";

const Toast = () => {
  const { isOpen, message, status } = useSelector(
    (state: RootState) => state.toastData
  );

  const toastRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(closeToast());
      }, 3000);
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className={`bg-${status} ${styles.toast}`}>
      <Type color="white" content={message} weight="bold" />
      <div id="toast-progress" ref={toastRef} className={styles.progress}></div>
    </div>
  );
};

export default Toast;
