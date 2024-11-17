import { createTRPCRouter } from "@/server/api/trpc";
import getGroupCourse from "./getGroupCourse.route";

export const stdProfileRouter = createTRPCRouter({
  getGroupCourse,
});
