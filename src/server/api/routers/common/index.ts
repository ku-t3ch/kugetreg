import { createTRPCRouter } from "@/server/api/trpc";
import getSchedule from "./getSchedule.route";

export const commonRouter = createTRPCRouter({
  getSchedule,
});
