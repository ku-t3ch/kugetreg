import getScheduleService from "@/services/getSchedule.service";
import { protectedProcedure } from "../../trpc";
import getGroupCourseService, {
  getGroupCourseSchema,
} from "@/services/getGroupCourse.service";

const getGroupCourse = protectedProcedure.query(async ({ ctx }) => {
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

    return getGroupCourseService({
      academicYear,
      semester,
      stdId: ctx.session.user.student.stdId,
    });
  } catch (error) {
    throw error;
  }
});

export default getGroupCourse;
