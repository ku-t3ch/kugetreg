import { downloadSchema } from "@/services/download/_schema/download.schema";
import getReceiptService from "@/services/download/getReceipt.service";

import { protectedProcedure } from "../../trpc";
import getReceiptTestService from "@/services/download/test/getReceiptTest.service";

const getReceipt = protectedProcedure.input(downloadSchema).mutation(async ({ ctx, input }) => {
  try {
    if (process.env.NODE_ENV === "development") {
      return getReceiptTestService(input);
    } else {
      return getReceiptService(input);
    }
  } catch (error) {
    throw error;
  }
});
export default getReceipt;
