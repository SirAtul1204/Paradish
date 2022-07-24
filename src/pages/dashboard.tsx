import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Nav from "../components/Nav";
import store, { RootState } from "../redux/store";
import styles from "../styles/Dashboard-styles.module.css";

const Dashboard = () => {
  const { token } = useSelector((state: RootState) => state.userData);

  const router = useRouter();

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

export default Dashboard;

export function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const { token } = store.getState().userData;
  console.log(token);
  if (!token) return { redirect: { permanent: false, destination: "/login" } };
  req.headers.authorization = token;
  return { props: {} };
}
