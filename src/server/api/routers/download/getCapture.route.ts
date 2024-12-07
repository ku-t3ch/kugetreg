import { downloadSchema } from "@/services/download/_schema/download.schema";
import getCaptureService from "@/services/download/getCapture.service";

import { protectedProcedure } from "../../trpc";
import getCaptureTestService from "@/services/download/test/getCaptureTest.service";

const getCapture = protectedProcedure.input(downloadSchema).mutation(async ({ ctx, input }) => {
  try {
    if (process.env.NODE_ENV === "development") {
      return getCaptureTestService(input);
    } else {
      return getCaptureService(input);
    }
  } catch (error) {
    throw error;
  }
});
export default getCapture;
