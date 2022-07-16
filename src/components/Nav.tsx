import styles from "../styles/Nav-styles.module.css";
import PrimaryButton from "./PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className="mw-wrapper">
        <div className={styles.container}>
          <div className={styles.imgWrapper}>
            <Link href="/">
              <Image
                src={"/assets/Paradish.png"}
                alt="Logo"
                className={styles.logo}
                layout="fill"
                objectFit="contain"
              />
            </Link>
          </div>
          <ul className={styles.navLinks}>
            {router.asPath !== "/login" && (
              <li className={styles.navLink}>
                <PrimaryButton
                  content="Login"
                  action={() => {
                    router.push("/login");
                  }}
                />
              </li>
            )}
            {router.asPath !== "/register" && (
              <li className={styles.navLink}>
                <PrimaryButton
                  content="Register"
                  action={() => {
                    router.push("/register");
                  }}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
