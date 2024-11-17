import { downloadSchema } from '@/services/download/_schema/download.schema';
import getReceiptService from '@/services/download/getReceipt.service';

import { protectedProcedure } from '../../trpc';

const getReceipt = protectedProcedure
  .input(downloadSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return getReceiptService(input);
    } catch (error) {
      throw error;
    }
  });
export default getReceipt;
