import { protectedProcedure } from "@/server/api/trpc";
import { downloadCreditManagementPdfSchema } from "@/services/creditManagement/download/_schema/download.schema";
import getCreditManagementPdfService from "@/services/download/getCreditManagementPdf.service";
import getCreditManagementPdfTestService from "@/services/download/test/getCreditManagementPdfTest.service";

const getCreditManagementPdf = protectedProcedure
  .input(downloadCreditManagementPdfSchema)
  .mutation(async ({ input }) => {
    try {
      if (process.env.NODE_ENV === "development") {
        return getCreditManagementPdfTestService(input);
      } else {
        return getCreditManagementPdfService(input);
      }
    } catch (error) {
      throw error;
    }
  });
export default getCreditManagementPdf;
