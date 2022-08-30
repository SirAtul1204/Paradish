import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const validateSession = async (ctx: GetServerSidePropsContext) => {
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

  return {
    props: {
      userEmail: session.user.email,
      userName: session.user.name,
    },
  };
};

export default validateSession;
