import getCreditManagementService from "@/services/creditManagement/getCreditManagement.service";
import { protectedProcedure } from "../../trpc";

const getCreditManagement = protectedProcedure.query(async ({ ctx }) => {
  try {
    return getCreditManagementService({
      studentCode: ctx.session.user.student.stdCode,
    });
  } catch (error) {
    throw error;
  }
});
export default getCreditManagement;
