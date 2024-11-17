import getCourseFromRedisService, {
  getCourseFromRedisSchema,
} from "@/services/download/getCourseFromRedis.service";

import { publicProcedure } from "../../trpc";

const getCourseFromRedis = publicProcedure
  .input(getCourseFromRedisSchema)
  .query(async ({ input }) => {
    try {
      return getCourseFromRedisService(input);
    } catch (error) {
      throw error;
    }
  });
export default getCourseFromRedis;
