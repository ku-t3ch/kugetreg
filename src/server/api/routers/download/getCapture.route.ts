import { downloadSchema } from "@/services/download/_schema/download.schema";
import getCaptureService from "@/services/download/getCapture.service";

import { protectedProcedure } from "../../trpc";

const getCapture = protectedProcedure
  .input(downloadSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return getCaptureService(input);
    } catch (error) {
      throw error;
    }
  });
export default getCapture;
