import { z } from "zod";

import { redisClient } from "@/configs/redis/redis";

export const getCourseFromRedisSchema = z.object({
  id: z.string(),
});

export type GetCourseFromRedisInput = z.infer<typeof getCourseFromRedisSchema>;

const getCourseFromRedisService = async (props: GetCourseFromRedisInput) => {
  try {
    const result: string | null = await redisClient.get(props.id);
    if (!result) {
      throw new Error("Not found");
    }
    return JSON.parse(result);
  } catch (error) {
    throw error;
  }
};

export default getCourseFromRedisService;
