import { NextPage } from "next";
import { FC } from "react";
import AuthHOC from "../components/AuthHOC";
import Card from "../components/Card";
import Nav from "../components/Nav";
import styles from "../styles/Dashboard-styles.module.css";

const Dashboard = () => {
  return (
    <div className="mainWrapper bg-tertiary">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default AuthHOC({ Component: Dashboard });
