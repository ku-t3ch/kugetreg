import { z } from "zod";

export const downloadSchema = z.object({
  screenType: z.enum(["desktop", "mobile"]).default("desktop").optional(),
  courseData: z.string(),
  major: z.string(),
});

export type DownloadInput = z.infer<typeof downloadSchema>;
