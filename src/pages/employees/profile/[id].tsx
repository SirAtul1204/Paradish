import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import Nav from "../../../components/Nav";
import { DefaultProps } from "../../../Utils/interface";
import validateSession from "../../../Utils/validateSession";
import styles from "../../../styles/Profile-styles.module.css";
import { trpc } from "../../../Utils/trpc";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import { camelToTitle } from "../../../Utils/camelToTitle";
import Title from "../../../components/Title";

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
        <Title color="white" content="Profile" variant="h2" />
        <table className={styles.table}>
          {Object.keys(data).map((key: any) => (
            <tr key={key}>
              <td className={`${styles.td} ${styles.colored}`}>
                {camelToTitle(key)}
              </td>
              <td className={styles.td}>
                {
                  //@ts-ignore
                  key !== "photo" || !data[key] ? (
                    //@ts-ignore
                    data[key] ?? "NIL"
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={styles.profilePic}
                      src={
                        //@ts-ignore
                        data[key]
                      }
                      alt="profile"
                    />
                  )
                }
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await validateSession(ctx);
};
