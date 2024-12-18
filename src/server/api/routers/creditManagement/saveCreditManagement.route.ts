import saveCreditManagementService, {
  SaveCreditManagementSchema,
} from "@/services/creditManagement/saveCreditManagement.service";
import { protectedProcedure } from "../../trpc";

const saveCreditManagement = protectedProcedure
  .input(SaveCreditManagementSchema.omit({ studentCode: true }))
  .mutation(async ({ ctx, input }) => {
    try {
      return saveCreditManagementService({
        studentCode: ctx.session.user.student.stdCode,
        payload: input.payload,
      });
    } catch (error) {
      throw error;
    }
  });
export default saveCreditManagement;
