import styles from "../styles/Card-styles.module.css";
import Image from "next/image";
import { FC } from "react";

interface CardProps {
  title: string;
  img: string;
  onClickHandler: () => void;
}

const Card: FC<CardProps> = ({ title, img, onClickHandler }) => {
  return (
    <div className={styles.container} onClick={onClickHandler}>
      <div className={styles.imgWrapper}>
        <Image src={img} layout="fill" alt={img.split("/").splice(-1)[0]} />
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default Card;
