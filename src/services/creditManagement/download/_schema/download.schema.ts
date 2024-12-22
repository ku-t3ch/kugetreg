import { z } from "zod";

export const downloadCreditManagementPdfSchema = z.object({
  payload: z.string(),
});

export type DownloadCreditManagementPdfInput = z.infer<typeof downloadCreditManagementPdfSchema>;
