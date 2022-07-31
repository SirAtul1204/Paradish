import { emailSchema } from "../../Utils/emailValidator";
import { createRouter } from "../createRouter";
import { z } from "zod";
import { prisma } from "../prisma";
import { TRPCError } from "@trpc/server";

export const userRouter = createRouter().query("all-users", {
  input: z.object({
    userEmail: emailSchema,
  }),
  async resolve({ input }) {
    const user = await prisma.user.findFirst({
      where: {
        email: input.userEmail,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized",
      });

    const allUsers = await prisma.user.findMany({
      where: {
        restaurantId: user.restaurantId,
      },
    });

    if (!allUsers)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Couldn't get users, wrong restaurant Id",
      });

    return allUsers;
  },
});
