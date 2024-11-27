import { createTRPCRouter } from "@/server/api/trpc";
import getSubject from "./getSubject.route";
import getSubjects from "./getSubjects.route";
import openSubjectForEnroll from "./openSubjectForEnroll.route";
import searchSubjectOpenEnr from "./searchSubjectOpenEnr.route";

export const enrollRouter = createTRPCRouter({
  getSubject,
  getSubjects,
  searchSubjectOpenEnr,
  openSubjectForEnroll,
});
