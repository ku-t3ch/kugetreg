import { z } from "zod";
import { subjectSchema } from "./subject.schema";

export const subjectGroupSchema = z.object({
  groupName: z.string(),
  minCredit: z.number(),
  subjects: z.array(subjectSchema),
  isEdit: z.boolean(),
});

export type SubjectGroupSchemaType = z.infer<typeof subjectGroupSchema>;
