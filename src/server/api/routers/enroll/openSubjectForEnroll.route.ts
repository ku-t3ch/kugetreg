import getScheduleService from "@/services/getSchedule.service";
import openSubjectForEnrollService, {
  OpenSubjectForEnrollSchema,
} from "@/services/openSubjectForEnroll.service";

import { protectedProcedure } from "../../trpc";

const openSubjectForEnroll = protectedProcedure
  .input(
    OpenSubjectForEnrollSchema.omit({
      academicYear: true,
      semester: true,
      campusCode: true,
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const getSchedule = await getScheduleService({
        campusCode: ctx.session.user.student.campusCode,
        facultyCode: ctx.session.user.student.facultyCode,
        majorCode: ctx.session.user.student.majorCode,
        stdStatusCode: ctx.session.user.student.studentStatusCode,
        userType: ctx.session.user.userType,
      });

      const academicYear = getSchedule.results[0]?.academicYr;
      const semester = getSchedule.results[0]?.semester;

      if (academicYear === undefined || semester === undefined) {
        throw new Error("Cannot get academicYear or semester");
      }

      return openSubjectForEnrollService({
        academicYear,
        semester,
        campusCode: ctx.session.user.student.campusCode,
        ...input,
      });
    } catch (error) {
      throw error;
    }
  });
export default openSubjectForEnroll;
