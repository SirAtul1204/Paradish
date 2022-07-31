import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Nav from "../components/Nav";
import { authOptions } from "./api/auth/[...nextauth]";
import styles from "../styles/Employees-styles.module.css";
import Title from "../components/Title";
import Table from "../components/Table";

import * as faker from "faker";

const generateTableData = () => {
  const tableData = [];
  for (let i = 0; i < 100; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      row.push(faker.random.word());
    }
    tableData.push(row);
  }
  return tableData;
};

const Employees = () => {
  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title color="white" variant="h2" content="Employees" />
        <Table
          tableHeadings={["ID", "NAME", "EMAIL", "ROLE", "ADDRESS"]}
          tableData={generateTableData()}
        />
      </div>
    </div>
  );
};

export default Employees;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: { permanent: false, destination: "/login" },
    };
  }

  return {
    props: {},
  };
}
