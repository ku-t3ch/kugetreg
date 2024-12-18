import z from "zod";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { differenceInMinutes, format, parse } from "date-fns";

export const OpenSubjectForEnrollSchema = z.object({
  sectionId: z.number(),
  subjectCode: z.string(),
  flagRegisCon: z.string(),
  subjectNameTh: z.string(),
  subjectNameEn: z.string(),
  maxCredit: z.number(),
  sectionCode: z.string(),
  sectionType: z.string(),
  sectionTypeTh: z.string(),
  sectionTypeEn: z.string(),
  studentStatusCode: z.string(),
  stdStatusTh: z.string(),
  stdStatusEn: z.string(),
  coursedate: z.string().nullable(),
  coursedateth: z.string(),
  coursedateen: z.string(),
  totalSeat: z.string(),
  totalRegistered: z.any(),
  teacherName: z.string(),
  teacherNameEn: z.string(),
  roomNameTh: z.string(),
  roomNameEn: z.string(),
  property: z.string().nullable(),
  nonProperty: z.string().nullable(),
  midternDate: z.string(),
  finalDate: z.string(),
  sectionStatus: z.string(),
});

export const OpenSubjectForEnrollSchemaToCourse =
  OpenSubjectForEnrollSchema.transform((data) =>
    (data.coursedate ?? "").split(",").map((item) => {
      const day = item.split("  ")[0]?.trim() ?? "";
      const time = item.split("  ")[1]?.trim() ?? "";

      const timeFrom = time?.split("-")[0]?.trim() ?? "";
      const timeTo = time?.split("-")[1]?.trim() ?? "";

      const time_start = differenceInMinutes(
        parse(timeFrom ?? "", "HH:mm", new Date()),
        parse("00:00", "HH:mm", new Date()),
      );

      return {
        uuid: uuid(),
        max_credit: data.maxCredit,
        section_id: data.sectionId,
        groupheader: data.subjectCode,
        weekstartday: data.coursedate,
        weekendday: data.coursedate,
        std_id: data.sectionId.toString(),
        subject_code: data.subjectCode,
        subject_name_th: data.subjectNameTh,
        subject_name_en: data.subjectNameEn,
        section_code: data.sectionCode,
        section_type: data.sectionType,
        section_type_th: data.sectionTypeTh,
        section_type_en: data.sectionTypeEn,
        student_status_code: data.studentStatusCode,
        std_status_th: data.stdStatusTh,
        std_status_en: data.stdStatusEn,
        teacher_name: data.teacherName,
        teacher_name_en: data.teacherNameEn,
        day_w_c: day,
        time_from: timeFrom,
        time_to: timeTo,
        day_w: day,
        room_name_th: data.roomNameTh,
        room_name_en: data.roomNameEn,
        time_start: time_start,
      };
    }),
  );

export type IOpenSubjectForEnrollResponse = z.infer<
  typeof OpenSubjectForEnrollSchema
>;
