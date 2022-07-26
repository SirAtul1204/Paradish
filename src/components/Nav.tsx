import styles from "../styles/Nav-styles.module.css";
import PrimaryButton from "./PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { openToast } from "../redux/reducers/toastReducer";
import { signOut, useSession } from "next-auth/react";
import Type from "./Type";

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    dispatch(
      openToast({ message: "Logged out successfully", status: "success" })
    );
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <nav className={styles.nav}>
      <div className="mw-wrapper">
        <div className={styles.container}>
          <div className={styles.imgWrapper}>
            <Link href="/">
              <Image
                src={"/assets/Paradish-white.png"}
                alt="Logo"
                className={styles.logo}
                layout="fill"
                objectFit="contain"
                priority
              />
            </Link>
          </div>
          <ul className={styles.navLinks}>
            {router.asPath !== "/login" && status === "unauthenticated" && (
              <li className={styles.navLink}>
                <PrimaryButton
                  content="Login"
                  action={() => {
                    router.push("/login");
                  }}
                />
              </li>
            )}
            {router.asPath !== "/register" && status === "unauthenticated" && (
              <li className={styles.navLink}>
                <PrimaryButton
                  content="Register"
                  action={() => {
                    router.push("/register");
                  }}
                />
              </li>
            )}
            {status === "authenticated" && (
              <li className={styles.navLink} onClick={goToProfile}>
                <Link href="/profile">
                  <Type color="white" content={data?.user?.name ?? ""} />
                </Link>
              </li>
            )}
            {router.asPath === "/" && status === "authenticated" && (
              <li className={styles.navLink}>
                <PrimaryButton
                  content="Dashboard"
                  action={() => {
                    router.push("/dashboard");
                  }}
                />
              </li>
            )}
            {router.asPath !== "/" && status === "authenticated" && (
              <li className={styles.navLink}>
                <PrimaryButton content="Logout" action={handleLogout} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
