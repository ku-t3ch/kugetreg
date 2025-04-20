import { type Course, CourseSchema } from "@/types/responses/IGroupCourseResponse";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { convertKeyToSectionType } from "utils/sectionTypeMap";
import { differenceInMinutes, parse } from "date-fns";

export const courseCustomSchema = z.object({
  uuid: z.string().optional(),
  subject_code: z.string().min(1, { message: "Subject code is required" }),
  credit: z.number().optional().default(0),
  section_code: z.string().optional().default("0"),
  section_type: z.string().optional().default(""),
  subject_name_en: z.string().min(1, { message: "Subject name is required" }),
  subject_name_th: z.string().optional(),
  teacher_name: z.string().optional().default(""),
  room: z.string().optional().default(""),
  time_from: z.string().min(1, { message: "Time from is required" }),
  time_to: z.string().min(1, { message: "Time to is required" }),
  day: z.string().min(1, { message: "Day is required" }),
});

export const courseCustomSchemaToStore = courseCustomSchema.transform(
  (data) => {
    const time_start = differenceInMinutes(
      parse(data.time_from ?? "", "HH:mm", new Date()),
      parse("00:00", "HH:mm", new Date()),
    );

    const courseTemp: Course = {
      uuid: data.uuid ?? uuidv4(),
      max_credit: data.credit,
      section_id: 0,
      groupheader: data.subject_code,
      weekstartday: `${data.day}  ${data.time_from} - ${data.time_to}`,
      weekendday: `${data.day}  ${data.time_from} - ${data.time_to}`,
      std_id: "",
      subject_code: data.subject_code,
      subject_name_th: data.subject_name_th ?? data.subject_name_en,
      subject_name_en: data.subject_name_en,
      section_code: data.section_code,
      section_type: "",
      section_type_th: convertKeyToSectionType(data.section_type).th,
      section_type_en: convertKeyToSectionType(data.section_type).en,
      student_status_code: "",
      std_status_th: "",
      std_status_en: "",
      teacher_name: data.teacher_name,
      teacher_name_en: data.teacher_name,
      day_w_c: "",
      time_from: data.time_from,
      time_to: data.time_to,
      day_w: data.day,
      room_name_th: data.room,
      room_name_en: data.room,
      time_start: time_start,
      is_hidden: false,
      is_custom: true,
    };

    const result = CourseSchema.parse(courseTemp);
    return result;
  },
);

export type CourseCustomSchemaType = z.infer<typeof courseCustomSchema>;
