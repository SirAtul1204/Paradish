import styles from "../styles/Card-styles.module.css";
import Image from "next/image";
const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <Image src="/assets/employee.png" layout="fill" alt="Add Employee" />
      </div>
      <p className={styles.title}>Add Employee</p>
    </div>
  );
};

export default Card;
