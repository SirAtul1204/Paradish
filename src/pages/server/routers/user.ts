import { createRouter } from "../createRouter";

export const userRouter = createRouter().query("hello", {
  resolve() {
    return "Hello World";
  },
});
