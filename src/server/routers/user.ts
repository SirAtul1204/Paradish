import { emailSchema } from "../../Utils/emailValidator";
import { createRouter } from "../createRouter";
import { z } from "zod";
import { prisma } from "../prisma";
import { TRPCError } from "@trpc/server";
import { nameSchema } from "../../Utils/nameValidator";
import { phoneSchema } from "../../Utils/phoneValidator";
import { Role } from "@prisma/client";
import generatePassword from "password-generator";
import AWS from "aws-sdk";
import sendEmail from "../../Utils/sendEmail";
import { EmailSubjects } from "../../Utils/interface";
import { PasswordHtmlTemplate } from "../../Utils/htmlTemplates";

export const userRouter = createRouter()
  .query("hello", {
    async resolve() {
      console.log("hello");
      // sendEmail({ subject: EmailSubjects.GetPassword });
      return { msg: "Hello World" };
    },
  })
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
      photo: z.object({
        extension: z.string().trim(),
        data: z.string().trim(),
      }),
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
          OR: [
            {
              email: input.email,
            },
            {
              phone: input.phoneNumber,
            },
          ],
        },
      });

      if (user)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with same email or phone already exists",
        });

      const password = generatePassword(
        7,
        true,
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      );

      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          name: `${input.firstName} ${input.lastName}`,
          role: input.role as Role,
          restaurantId: creator.restaurantId,
          password,
          phone: input.phoneNumber,
          panNumber: input.pan,
          aadharNumber: input.aadhar,
          languagesKnown: input.languagesKnown.join(","),
          address: input.address,
        },
      });

      if (!newUser)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Couldn't create user",
        });

      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      });

      const base64Data = Buffer.from(
        input.photo.data.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      s3.upload(
        {
          Bucket: "paradish",
          Key: `profile_pictures/${newUser.id}.${input.photo.extension}`,
          Body: base64Data,
          ContentEncoding: "base64",
          ContentType: `image/${input.photo.extension}`,
        },
        async (err, data) => {
          if (err) {
            await prisma.user.delete({
              where: {
                id: newUser.id,
              },
            });

            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Couldn't upload photo",
            });
          } else {
            const photoUrl = data.Location;
            const updatedUser = await prisma.user.update({
              where: {
                id: newUser.id,
              },
              data: {
                photo: photoUrl,
              },
            });

            if (!updatedUser) {
              await prisma.user.delete({
                where: {
                  id: newUser.id,
                },
              });

              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Couldn't update user",
              });
            }
          }
        }
      );

      const restaurant = await prisma.restaurant.findFirst({
        where: {
          id: creator.restaurantId,
        },
      });

      if (!restaurant)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Couldn't find restaurant",
        });

      sendEmail({
        subject: EmailSubjects.GetPassword,
        email: input.email,
        name: `${input.firstName}`,
        restaurantName: restaurant.name,
        htmlTemplate: PasswordHtmlTemplate(password),
      });

      return { message: "User created successfully", user: newUser.id };
    },
  });
