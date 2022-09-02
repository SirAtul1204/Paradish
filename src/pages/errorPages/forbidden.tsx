import Image from "next/image";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import PrimaryButton from "../../components/PrimaryButton";
import Type from "../../components/Type";
import styles from "../../styles/ErrorPages-styles.module.css";

const NotAuthorized = () => {
  const router = useRouter();

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <div className={styles.imgContainer}>
          <Image src="/assets/forbidden.jpg" layout="fill" alt="Forbidden" />
        </div>
        <Type
          color="white"
          content="You are not authorized to view this page"
        />
        <PrimaryButton
          content="Go To Dashboard"
          variant="big"
          action={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
};

export default NotAuthorized;
