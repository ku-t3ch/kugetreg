import getSubjectsService, {
  GetSubjectsSchema,
} from "@/services/getSubjects.service";
import { protectedProcedure } from "../../trpc";
import getScheduleService from "@/services/getSchedule.service";

const getSubjects = protectedProcedure
  .input(
    GetSubjectsSchema.omit({
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

      if (!academicYear || !semester) {
        throw new Error("Cannot get academicYear or semester");
      }

      return getSubjectsService({
        academicYear: academicYear,
        semester: semester,
        campusCode: ctx.session.user.student.campusCode,
        ...input,
      });
    } catch (error) {
      throw error;
    }
  });
export default getSubjects;
