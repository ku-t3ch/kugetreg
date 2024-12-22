import { getCourseFromRedisSchema } from "@/services/download/getCourseFromRedis.service";

import { publicProcedure } from "../../trpc";
import getCreditManagementPdfFromRedisService from "@/services/download/getCreditManagementPdfFromRedis.service";

const getCreditManagementFromRedis = publicProcedure
  .input(getCourseFromRedisSchema)
  .query(async ({ input }) => {
    try {
      return getCreditManagementPdfFromRedisService(input);
    } catch (error) {
      throw error;
    }
  });
export default getCreditManagementFromRedis;
