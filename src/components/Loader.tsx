import { FC } from "react";
import { HashLoader } from "react-spinners";
import styles from "../styles/Loader-styles.module.css";
import Title from "./Title";

interface LoaderProps {
  content?: string;
}

const Loader: FC<LoaderProps> = ({ content }) => {
  return (
    <div className={styles.loader}>
      <HashLoader color="#f87474" />
      {content && <Title color="white" variant="h2" content={content} />}
    </div>
  );
};

export default Loader;
