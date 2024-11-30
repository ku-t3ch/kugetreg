import getPlanningCourseService from "@/services/planningCourse/getPlanningCourse.service";

import { protectedProcedure } from "../../trpc";

const getPlanningCourse = protectedProcedure.query(async ({ ctx }) => {
  try {
    return getPlanningCourseService({
      studentCode: ctx.session.user.student.stdCode,
    });
  } catch (error) {
    throw error;
  }
});
export default getPlanningCourse;
