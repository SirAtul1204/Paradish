import { z } from "zod";
import * as trpc from "@trpc/server";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";

export const restaurantRouter = createRouter().mutation("create", {
  input: z.object({
    restaurantName: z
      .string({
        required_error: "Restaurant Name is required",
      })
      .trim(),
    ownerName: z
      .string({
        required_error: "Owner Name is required",
      })
      .trim(),
    ownerEmail: z
      .string({
        required_error: "Owner Email is required",
      })
      .trim()
      .email(),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
  async resolve({ input }) {
    const password = await bcrypt.hash(input.password, 10);

    const owner = await prisma.user.findFirst({
      where: {
        email: input.ownerEmail,
        role: "OWNER",
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
          connectOrCreate: {
            create: {
              email: input.ownerEmail,
              name: input.ownerName,
              password: password,
              role: "OWNER",
            },
            where: {
              email: input.ownerEmail,
            },
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
