import { z } from "zod";

export const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .min(6, "Password must be at least 6 characters long")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    "Must be at least 6 characters long, with one letter and one number"
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
