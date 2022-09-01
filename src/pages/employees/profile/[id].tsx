import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import { DefaultProps } from "../../../Utils/interface";
import validateSession from "../../../Utils/validateSession";

const Profile: NextPage<DefaultProps> = ({ userEmail, userName }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>{userEmail}</p>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await validateSession(ctx);
};
