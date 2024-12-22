import { z } from "zod";

import { redisClient } from "@/configs/redis/redis";
import { type CreditManagementSchemaType } from "@/schemas/creditManagement/creditManagement.schema";

export const getCreditManagementPdfFromRedisSchema = z.object({
  id: z.string(),
});

export type GetCreditManagementPdfFromRedisInput = z.infer<typeof getCreditManagementPdfFromRedisSchema>;

const getCreditManagementPdfFromRedisService = async (props: GetCreditManagementPdfFromRedisInput) => {
  try {
    const result: string | null = await redisClient.get(props.id);
    if (!result) {
      throw new Error("Not found");
    }
    return JSON.parse(JSON.parse(result)) as CreditManagementSchemaType;
  } catch (error) {
    throw error;
  }
};

export default getCreditManagementPdfFromRedisService;
