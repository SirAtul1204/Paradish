import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Card from "../components/Card";
import Nav from "../components/Nav";
import styles from "../styles/Dashboard-styles.module.css";
import { authOptions } from "./api/auth/[...nextauth]";

const Dashboard: NextPage = () => {
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

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const session = unstable_getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: { permanent: false, destination: "/login" },
    };
  }

  return {
    props: {},
  };
};
