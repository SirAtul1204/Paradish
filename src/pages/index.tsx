import type { NextPage } from "next";
import styles from "../styles/Index-styles.module.css";
import Nav from "../components/Nav";
import Title from "../components/Title";
import Image from "next/image";
import { trpc } from "../Utils/trpc";
import { useEffect } from "react";

const Home: NextPage = () => {
  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <Title variant="h1" content="Welcome to Paradish!" />
            <Title
              variant="h2"
              content="Your one stop solution to all your Restaurant needs!"
            />
          </div>
          <div className={styles.imgWrapper}>
            <Image
              src={"/assets/restaurant.webp"}
              alt="restaurant"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
