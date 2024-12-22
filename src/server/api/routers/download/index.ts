import { createTRPCRouter } from "@/server/api/trpc";
import getCourseFromRedis from "./getCourseFromRedis.route";
import getCapture from "./getCapture.route";
import getPdf from "./getPdf.route";
import getReceipt from "./getReceipt.route";
import getCreditManagementPdf from "./getCreditManagementPdf.route";
import getCreditManagementFromRedis from "./getCreditManagementFromRedis.route";

export const downloadRouter = createTRPCRouter({
  getCourseFromRedis,
  getCreditManagementFromRedis,
  getCapture,
  getPdf,
  getReceipt,
  getCreditManagementPdf
});
