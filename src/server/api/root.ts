import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { commonRouter } from "./routers/common";
import { enrollRouter } from "./routers/enroll";
import { stdProfileRouter } from "./routers/std-profile";
import { downloadRouter } from "./routers/download";
import { planningCourseRouter } from "./routers/planningCourse";
import { langRouter } from "./routers/lang";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  common: commonRouter,
  enroll: enrollRouter,
  stdProfile: stdProfileRouter,
  download: downloadRouter,
  planningCourse: planningCourseRouter,
  lang: langRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
