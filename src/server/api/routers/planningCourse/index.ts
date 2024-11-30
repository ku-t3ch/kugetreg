import { createTRPCRouter } from "@/server/api/trpc";
import getPlanningCourse from "./getPlanningCourse.route";
import savePlanningCourse from "./savePlanningCourse.route";

export const planningCourseRouter = createTRPCRouter({
  getPlanningCourse,
  savePlanningCourse,
});
