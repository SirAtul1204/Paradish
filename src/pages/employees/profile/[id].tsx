import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
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

interface TModalState {
  content: string;
  inputType: "text" | "file";
  handleSave: (val: string) => void;
  handleCancel: () => void;
  isOpen: boolean;
}

const Profile: NextPage<DefaultProps> = ({ userEmail, userName }) => {
  const router = useRouter();

  const { data, isFetching, isError } = trpc.useQuery([
    "user.get-by-id",
    { creatorEmail: userEmail, id: parseInt(String(router.query.id)) },
  ]);

  const [newVal, setNewVal] = useState<string>("");

  const [modalState, setModalState] = useState<TModalState>({
    content: "",
    inputType: "text",
    handleSave: (val: string) => {},
    handleCancel: () => {},
    isOpen: false,
  });

  const utils = trpc.useContext();

  const mutation = trpc.useMutation("user.update", {
    onSuccess: (data) => {
      utils.invalidateQueries(["user.get-by-id"]);
    },
  });

  const handleEdit = (key: string) => {
    setModalState({
      content: camelToTitle(key),
      //@ts-ignore
      val: data[key],
      inputType: key === "photo" ? "file" : "text",
      handleSave: (val: string) => {
        mutation.mutate({
          creatorEmail: userEmail,
          id: parseInt(String(router.query.id)),
          key,
          val,
        });

        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
      handleCancel: () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
      isOpen: true,
    });
  };

  if (isFetching || mutation.isLoading)
    return <Loader content="Fetching profile data..." />;

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
        {modalState.isOpen && (
          <EditModal
            newVal={newVal}
            changeNewVal={(e) => setNewVal(e.target.value)}
            content={modalState.content}
            inputType={modalState.inputType}
            handleSave={modalState.handleSave}
            handleCancel={modalState.handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await validateSession(ctx);
};
