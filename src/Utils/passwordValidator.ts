import { z } from "zod";

export const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    "Must be at least 8 characters long, with at least one uppercase letter, one lowercase letter and one number"
  );

export const passwordValidator = (
  password: string
): [boolean, string | undefined] => {
  let res: [boolean, string | undefined] = [false, undefined];

  try {
    passwordSchema.parse(password);
    res[0] = true;
  } catch (e: any) {
    res[1] = JSON.parse(e)[0].message;
  } finally {
    return res;
  }
};
