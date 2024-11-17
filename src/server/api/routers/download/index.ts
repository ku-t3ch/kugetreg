import { createTRPCRouter } from "@/server/api/trpc";
import getCourseFromRedis from "./getCourseFromRedis.route";
import getCapture from "./getCapture.route";
import getPdf from "./getPdf.route";
import getReceipt from "./getReceipt.route";

export const downloadRouter = createTRPCRouter({
  getCourseFromRedis,
  getCapture,
  getPdf,
  getReceipt,
});
