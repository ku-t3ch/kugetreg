import { downloadSchema } from "@/services/download/_schema/download.schema";
import getPdfService from "@/services/download/getPdf.service";

import { protectedProcedure } from "../../trpc";
import getPdfTestService from "@/services/download/test/getPdfTest.service";

const getPdf = protectedProcedure.input(downloadSchema).mutation(async ({ ctx, input }) => {
  try {
    if (process.env.NODE_ENV === "development") {
      return getPdfTestService(input);
    } else {
      return getPdfService(input);
    }
  } catch (error) {
    throw error;
  }
});
export default getPdf;
