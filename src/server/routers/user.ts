import { emailSchema } from "../../Utils/emailValidator";
import { createRouter } from "../createRouter";
import { z } from "zod";
import { prisma } from "../prisma";
import { TRPCError } from "@trpc/server";
import { nameSchema } from "../../Utils/nameValidator";
import { phoneSchema } from "../../Utils/phoneValidator";
import { Role } from "@prisma/client";

export const userRouter = createRouter()
  .query("all-users", {
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
  })
  .mutation("create", {
    input: z.object({
      creatorEmail: emailSchema,
      firstName: nameSchema,
      lastName: nameSchema,
      email: emailSchema,
      phoneNumber: phoneSchema,
      role: z.string().trim(),
      pan: z.string().trim(),
      aadhar: z.string().trim(),
      languagesKnown: z.array(z.string().trim()),
      photo: z.string(),
      address: z.string().trim(),
    }),

    async resolve({ input }) {
      const creator = await prisma.user.findFirst({
        where: {
          email: input.creatorEmail,
          role: Role.OWNER,
        },
      });

      if (!creator)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized",
        });

      const user = await prisma.user.findFirst({
        where: {
          email: input.creatorEmail,
        },
      });

      if (user)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });

      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          name: `${input.firstName} ${input.lastName}`,
          role: input.role as Role,
          restaurantId: creator.restaurantId,
          password: "",
          phone: input.phoneNumber,
          panNumber: input.pan,
          aadharNumber: input.aadhar,
          languagesKnown: input.languagesKnown.join(","),
          photo: input.photo,
          address: input.address,
        },
      });

      if (!newUser)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Couldn't create user",
        });

      return { message: "User created successfully", user: newUser.id };
    },
  });
