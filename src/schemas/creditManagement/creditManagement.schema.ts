import { z } from "zod";
import { subjectGroupSchema } from "./subjectGroup.schema";

export const creditManagementSchema = z.object({
  general_education: z.array(subjectGroupSchema),
  specific_courses: z.array(subjectGroupSchema),
  free_elective: z.array(subjectGroupSchema),
});

export type CreditManagementSchemaType = z.infer<typeof creditManagementSchema>;
