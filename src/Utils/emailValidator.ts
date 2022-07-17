import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .trim()
  .email({
    message: "Enter a valid email",
  });

export const emailValidator = (
  email: string
): [boolean, string | undefined] => {
  let res: [boolean, string | undefined] = [false, undefined];
  try {
    emailSchema.parse(email);
    res[0] = true;
  } catch (e: any) {
    console.log(e);
    res[1] = JSON.parse(e)[0].message;
  } finally {
    console.log(res);
    return res;
  }
};
