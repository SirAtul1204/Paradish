import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import Card from "../components/Card";
import Nav from "../components/Nav";
import styles from "../styles/Dashboard-styles.module.css";
import validateSession from "../Utils/validateSession";
import { authOptions } from "./api/auth/[...nextauth]";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Employees",
      img: "/assets/employee.png",
      onClickHandler: () => router.push("/employees"),
    },
  ];

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return validateSession(ctx);
};
