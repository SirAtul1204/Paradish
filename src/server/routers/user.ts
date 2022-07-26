import { emailSchema } from "../../Utils/emailValidator";
import { passwordSchema } from "../../Utils/passwordValidator";
import { createRouter } from "../createRouter";
import { z } from "zod";
import { prisma } from "../prisma";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";

export const userRouter = createRouter()
  .mutation("login", {
    input: z.object({
      email: emailSchema,
      password: passwordSchema,
    }),
    async resolve({ input }) {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User does not exist, try creating an account",
        });

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password, please try again",
        });

      return {
        message: "Login successful",
        userId: user.id,
      };
    },
  })
  .query("verify", {
    input: z.object({
      token: z.string().optional(),
    }),
    async resolve({ input }) {
      try {
        return {
          message: "Verification successful",
        };
      } catch (e: any) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid token, please try again",
        });
      }
    },
  });
