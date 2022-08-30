import { GetServerSidePropsContext } from "next";
import validateSession from "../../../Utils/validateSession";

const Profile = () => {};

export default Profile;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return validateSession(ctx);
};
