import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../pages/server/routers/app";

export const trpc = createReactQueryHooks<AppRouter>();
