import { prisma } from "../server/prisma";

const validateRole = async (userEmail: string, expectedRoles: string[]) => {
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!user)
    return {
      redirect: { permanent: false, destination: "/login" },
    };

  if (expectedRoles.includes(user.role)) {
    return {
      props: {
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
      },
    };
  } else {
    return {
      redirect: { permanent: false, destination: "/errorPages/forbidden" },
    };
  }
};

export default validateRole;
