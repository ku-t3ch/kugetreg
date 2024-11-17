import { downloadSchema } from '@/services/download/_schema/download.schema';
import getPdfService from '@/services/download/getPdf.service';

import { protectedProcedure } from '../../trpc';

const getPdf = protectedProcedure
  .input(downloadSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return getPdfService(input);
    } catch (error) {
      throw error;
    }
  });
export default getPdf;
