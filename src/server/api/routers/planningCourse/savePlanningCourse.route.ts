import { protectedProcedure } from "../../trpc";
import savePlanningCourseService, {
  SavePlanningCourseSchema,
} from "@/services/planningCourse/savePlanningCourse.service";

const savePlanningCourse = protectedProcedure
  .input(SavePlanningCourseSchema.omit({ studentCode: true }))
  .mutation(async ({ ctx, input }) => {
    try {
      return savePlanningCourseService({
        studentCode: ctx.session.user.student.stdCode,
        course: input.course,
      });
    } catch (error) {
      throw error;
    }
  });
export default savePlanningCourse;
