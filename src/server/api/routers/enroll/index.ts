import { createTRPCRouter } from "@/server/api/trpc";
import getSubject from "./getSubject.route";
import getSubjects from "./getSubjects.route";

export const enrollRouter = createTRPCRouter({
  getSubject,
  getSubjects,
});
