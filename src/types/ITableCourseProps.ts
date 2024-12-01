import { type Course } from "./responses/IGroupCourseResponse";

export interface ITableCourseProps {
  scheduleData: Course[];
  onClick?: (course: Course) => void;
  theme?: string;
  isExport?: boolean;
}
