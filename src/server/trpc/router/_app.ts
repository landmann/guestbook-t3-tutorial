import { guestbookRouter } from "./guestbook";
import { router } from "../trpc";
import { authRouter } from "./auth";

export const appRouter = router({
  guestbook: guestbookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
