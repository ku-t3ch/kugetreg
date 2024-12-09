import setLangService, { SetLangSchema } from "@/services/lang/setLang.service";

import { protectedProcedure } from "../../trpc";

const setLang = protectedProcedure
  .input(SetLangSchema.omit({ studentCode: true }))
  .mutation(async ({ ctx, input }) => {
    try {
      return setLangService({
        studentCode: ctx.session.user.student.stdCode,
        lang: input.lang,
      });
    } catch (error) {
      throw error;
    }
  });
export default setLang;
