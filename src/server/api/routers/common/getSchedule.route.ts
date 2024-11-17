import getScheduleService from "@/services/getSchedule.service";
import { protectedProcedure } from "../../trpc";

const getSchedule = protectedProcedure.mutation(async ({ ctx, input }) => {
  try {
    return getScheduleService({
      campusCode: ctx.session.user.student.campusCode,
      facultyCode: ctx.session.user.student.facultyCode,
      majorCode: ctx.session.user.student.majorCode,
      stdStatusCode: ctx.session.user.student.studentStatusCode,
      userType: ctx.session.user.userType,
    });
  } catch (error) {
    throw error;
  }
});
export default getSchedule;
