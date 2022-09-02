import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import Nav from "../../../components/Nav";
import { DefaultProps } from "../../../Utils/interface";
import validateSession from "../../../Utils/validateSession";
import styles from "../../../styles/Profile-styles.module.css";
import { trpc } from "../../../Utils/trpc";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";

const Profile: NextPage<DefaultProps> = ({ userEmail, userName }) => {
  const router = useRouter();

  const { data, isLoading, isError } = trpc.useQuery([
    "user.get-by-id",
    { creatorEmail: userEmail, id: parseInt(String(router.query.id)) },
  ]);

  if (isLoading) return <Loader content="Fetching profile data..." />;

  if (isError) {
    router.push("/errorPages/forbidden");
  }

  if (!data) return null;

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <td className={styles.td}>Email</td>
            <td className={styles.td}>{data.email}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await validateSession(ctx);
};
