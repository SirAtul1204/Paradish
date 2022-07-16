import * as trpc from "@trpc/server";
import { createRouter } from "../createRouter";
import { restaurantRouter } from "./restaurant";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .merge("user.", userRouter)
  .merge("restaurant.", restaurantRouter);

export type AppRouter = typeof appRouter;
