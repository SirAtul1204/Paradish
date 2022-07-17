import { HashLoader } from "react-spinners";
import styles from "../styles/Loader-styles.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <HashLoader color="#f87474" />
    </div>
  );
};

export default Loader;
