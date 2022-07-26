import { emailSchema } from "../../Utils/emailValidator";
import { passwordSchema } from "../../Utils/passwordValidator";
import { createRouter } from "../createRouter";
import { z } from "zod";
import { prisma } from "../prisma";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";

export const userRouter = createRouter().query("verify", {
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
