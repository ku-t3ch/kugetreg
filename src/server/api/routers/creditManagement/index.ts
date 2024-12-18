import { createTRPCRouter } from "@/server/api/trpc";
import getCreditManagement from "./getCreditManagement.route";
import saveCreditManagement from "./saveCreditManagement.route";

export const creditManagementRouter = createTRPCRouter({
    getCreditManagement,
    saveCreditManagement
});
