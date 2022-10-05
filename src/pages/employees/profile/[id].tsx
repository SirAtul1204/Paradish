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
import StatusButton from "../../../components/StatusButton";
import EditModal from "../../../components/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  openEditModal,
  updateModal,
} from "../../../redux/reducers/EditModalReducer";

const Profile: NextPage<DefaultProps> = ({ userEmail, userName }) => {
  const router = useRouter();

  const { isOpen } = useSelector((state: RootState) => state.editModalData);

  const { data, isLoading, isError } = trpc.useQuery([
    "user.get-by-id",
    { creatorEmail: userEmail, id: parseInt(String(router.query.id)) },
  ]);

  const dispatch = useDispatch();

  const handleEdit = (key: string) => {
    dispatch(
      updateModal({
        content: camelToTitle(key),
        //@ts-ignore
        val: data[key],
      })
    );
    dispatch(openEditModal());
  };

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
              {key !== "id" && key !== "restaurantId" ? (
                <td className={styles.td}>
                  <StatusButton
                    action={() => handleEdit(key)}
                    content="Edit"
                    status="info"
                  />
                </td>
              ) : (
                <td className={styles.td}></td>
              )}
            </tr>
          ))}
        </table>
        {isOpen && <EditModal />}
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await validateSession(ctx);
};
