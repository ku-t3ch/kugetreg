import getCurrentLangService from '@/services/lang/getCurrentLang.service';

import { protectedProcedure } from '../../trpc';

const getCurrentLang = protectedProcedure.mutation(async ({ ctx, input }) => {
  try {
    return getCurrentLangService({
      studentCode: ctx.session.user.student.stdCode,
    });
  } catch (error) {
    throw error;
  }
});
export default getCurrentLang;
