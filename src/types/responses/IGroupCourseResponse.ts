import { z } from "zod";

export interface IGroupCourseResponse {
  peroid_date: string;
  course: Course[];
}

export const CourseSchema = z.object({
  uuid: z.string().optional(),
  max_credit: z.number().optional(),
  section_id: z.number(),
  groupheader: z.string(),
  weekstartday: z.string(),
  weekendday: z.string(),
  std_id: z.string(),
  subject_code: z.string(),
  subject_name_th: z.string(),
  subject_name_en: z.string(),
  section_code: z.string(),
  section_type: z.string(),
  section_type_th: z.string(),
  section_type_en: z.string(),
  student_status_code: z.string(),
  std_status_th: z.string(),
  std_status_en: z.string(),
  teacher_name: z.string(),
  teacher_name_en: z.string(),
  day_w_c: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  day_w: z.string(),
  room_name_th: z.string(),
  room_name_en: z.string(),
  time_start: z.number(),
  is_hidden: z.boolean().default(false).optional().nullable(),
});

export type Course = z.infer<typeof CourseSchema>;
