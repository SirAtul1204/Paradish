import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Nav from "../../components/Nav";
import { authOptions } from "../api/auth/[...nextauth]";
import styles from "../../styles/Employees-styles.module.css";
import Title from "../../components/Title";
import Table from "../../components/Table";
import { FC } from "react";
import { trpc } from "../../Utils/trpc";
import Loader from "../../components/Loader";
import PrimaryButton from "../../components/PrimaryButton";
import * as faker from "faker";
import { useRouter } from "next/router";
import Link from "next/link";

const generateEmployees = () => {
  const employees = [];
  for (let i = 0; i < 100; i++) {
    employees.push([
      faker.name.findName(),
      faker.internet.email(),
      faker.name.jobTitle(),
    ]);
  }
  return employees;
};
interface EmployeesProps {
  userEmail: string;
  userName: string;
}

const Employees: FC<EmployeesProps> = ({ userEmail, userName }) => {
  const { data, isLoading } = trpc.useQuery(["user.all-users", { userEmail }]);

  const router = useRouter();

  const handleAddEmployee = () => {
    router.push("/employees/add");
  };

  if (isLoading) {
    return <Loader content="Loading employee details" />;
  }

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title color="white" variant="h2" content="Employees" />
        <Table
          tableHeadings={["NAME", "EMAIL", "ROLE"]}
          // tableData={generateEmployees()}
          tableData={data?.map((user) => [user.name, user.email, user.role])}
          routes={data?.map((user) => `/employees/profile/${user.id}`)}
        />
      </div>
      <div className={styles.btnContainer}>
        <PrimaryButton
          action={handleAddEmployee}
          content="Add Employee"
          type="button"
          variant="big"
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

  if (!session || !session.user) {
    return {
      redirect: { permanent: false, destination: "/login" },
    };
  }

  console.log(session);

  return {
    props: {
      userEmail: session.user.email,
      userName: session.user.name,
    },
  };
}
