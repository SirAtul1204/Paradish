import { GetServerSidePropsContext } from "next";
import validateSession from "../../../Utils/validateSession";

const Profile = () => {};

export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await validateSession(ctx);
};
