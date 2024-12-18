import { z } from "zod";

export const subjectSchema = z.object({
  subjectCode: z.string(),
  subjectNameTh: z.string(),
  subjectNameEn: z.string(),
  credit: z.number(),
  isEdit: z.boolean(),
});

export type SubjectSchemaType = z.infer<typeof subjectSchema>;
