import { protectedProcedure } from "../../trpc";
import searchSubjectOpenEnrService, {
  SearchSubjectOpenEnrSchema,
} from "@/services/searchSubjectOpenEnr.service";

const searchSubjectOpenEnr = protectedProcedure
  .input(SearchSubjectOpenEnrSchema)
  .mutation(async ({ input }) => {
    try {
      return searchSubjectOpenEnrService(input);
    } catch (error) {
      throw error;
    }
  });
export default searchSubjectOpenEnr;
