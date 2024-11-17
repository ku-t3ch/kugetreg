import getCourseFromRedisService, {
  getCourseFromRedisSchema,
} from "@/services/download/getCourseFromRedis.service";

import { protectedProcedure } from "../../trpc";

const getCourseFromRedis = protectedProcedure
  .input(getCourseFromRedisSchema)
  .query(async ({ input }) => {
    try {
      return getCourseFromRedisService(input);
    } catch (error) {
      throw error;
    }
  });
export default getCourseFromRedis;
