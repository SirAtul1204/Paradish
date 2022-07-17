import { z } from "zod";

export const nameSchema = z
  .string({
    required_error: "Name is required",
  })
  .trim()
  .max(56, "Name must be smaller than 56 characters");

export const nameValidator = (name: string): [boolean, string | undefined] => {
  let res: [boolean, string | undefined] = [false, undefined];
  try {
    nameSchema.parse(name);
    res[0] = true;
  } catch (e: any) {
    res[1] = JSON.parse(e)[0].message;
  } finally {
    return res;
  }
};
