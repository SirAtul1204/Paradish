import { z } from "zod";

export const phoneSchema = z.string().trim().length(10, "Length should be 10");

export const phoneValidator = (
  phone: string
): [boolean, string | undefined] => {
  let res: [boolean, string | undefined] = [false, undefined];
  try {
    phoneSchema.parse(phone);
    res[0] = true;
  } catch (e: any) {
    console.log(e);
    res[1] = JSON.parse(e)[0].message;
  } finally {
    return res;
  }
};
