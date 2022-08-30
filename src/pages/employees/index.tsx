import { GetServerSidePropsContext, NextPage } from "next";
import Nav from "../../components/Nav";
import styles from "../../styles/Employees-styles.module.css";
import Title from "../../components/Title";
import Table from "../../components/Table";
import { trpc } from "../../Utils/trpc";
import Loader from "../../components/Loader";
import PrimaryButton from "../../components/PrimaryButton";
import { useRouter } from "next/router";
import { DefaultProps } from "../../Utils/interface";
import validateSession from "../../Utils/validateSession";

const Employees: NextPage<DefaultProps> = ({ userEmail }) => {
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
  return validateSession(ctx);
}
