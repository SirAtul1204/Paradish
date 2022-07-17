import { z } from "zod";
import * as trpc from "@trpc/server";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { emailSchema } from "../../Utils/emailValidator";
import { nameSchema } from "../../Utils/nameValidator";
import { passwordSchema } from "../../Utils/passwordValidator";

export const restaurantRouter = createRouter().mutation("create", {
  input: z.object({
    restaurantName: nameSchema,
    ownerName: nameSchema,
    ownerEmail: emailSchema,
    password: passwordSchema,
  }),
  async resolve({ input }) {
    const password = await bcrypt.hash(input.password, 10);

    const owner = await prisma.user.findFirst({
      where: {
        email: input.ownerEmail,
        role: Role.OWNER,
      },
    });

    if (owner)
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });

    const restaurant = await prisma?.restaurant.create({
      data: {
        name: input.restaurantName,
        employees: {
          create: {
            email: input.ownerEmail,
            name: input.ownerName,
            password: password,
            role: Role.OWNER,
          },
        },
      },
    });

    if (!restaurant)
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Couldn't make a restaurant",
      });

    return { message: "SUCCESS", restaurantId: restaurant.id };
  },
});
