import { downloadSchema } from "@/services/download/_schema/download.schema";
import getCaptureService from "@/services/download/getCapture.service";

import { protectedProcedure } from "../../trpc";
import getCaptureTestService from "@/services/download/getCaptureTest.service";

const getCapture = protectedProcedure
  .input(downloadSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return getCaptureService(input);
    //   return getCaptureTestService(input);
    } catch (error) {
      throw error;
    }
  });
export default getCapture;
