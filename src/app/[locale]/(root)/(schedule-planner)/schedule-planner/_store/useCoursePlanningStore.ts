import CryptoJS from "crypto-js";
import { create } from "zustand";
import { type Course } from "@/types/responses/IGroupCourseResponse";
import { differenceInMinutes, parse } from "date-fns";
import _ from "lodash";
import { convertKeyToDate } from "utils/daysMap";

type Store = {
  courses: Course[];
  getCourses: () => Course[];
  getCoursesUnique: () => Course[];
  getCoursesForSave: () => Course[];
  getTotalCredit: () => number;
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course[]) => void;
  editCourse: (course: Course) => void;
  removeCourses: (course: Course) => void;
  checkIsConflict: (course: Course[]) => Course[];
  onHidden: (course: Course) => void;
  onShow: (course: Course) => void;
  checkIsChange: (course: Course[]) => boolean;
};

const useCoursePlanningStore = create<Store>()((set, get) => ({
  courses: [],
  getCourses: () =>
    _.sortBy(
      get().courses,
      (course) =>
        convertKeyToDate(course.day_w.trim())?.value && course.time_start,
    ).filter((course) => !course.is_hidden),
  getCoursesUnique: () =>
    _.sortBy(
      _.uniqBy(get().courses, (course) => course.subject_code),
      (course) => course.subject_name_en,
    ),
  getCoursesForSave: () => {
    return get().courses;
  },
  getTotalCredit: () =>
    _.sumBy(
      _.uniqBy(get().courses, (x) => x.subject_code + x.max_credit).filter(
        (course) => !course.is_hidden,
      ),
      (x) => x.max_credit!,
    ),
  setCourses: (courses: Course[]) => set({ courses }),
  addCourse: (course: Course[]) => {
    const currentCourses = get().courses;
    const newCourses = [
      ...currentCourses,
      ...course.map((c) => ({ ...c, is_hidden: false })),
    ];
    set({ courses: newCourses });
  },
  editCourse: (course: Course) => {
    const currentCourses = get().courses;
    const newCourses = _.map(currentCourses, (courseMap) => {
      if (courseMap.uuid === course.uuid) {
        return { ...course };
      }
      return courseMap;
    });
    set({ courses: newCourses });
  },
  removeCourses: (course: Course) => {
    if (course.is_custom) {
      const currentCourses = get().courses;
      const newCourses = currentCourses.filter((c) => c.uuid !== course.uuid);
      set({ courses: newCourses });
    } else {
      const currentCourses = get().courses;
      const newCourses = currentCourses.filter(
        (c) =>
          !(
            c.subject_code === course.subject_code &&
            c.section_code === course.section_code
          ),
      );
      set({ courses: newCourses });
    }
  },
  checkIsConflict: (courses: Course[]) => {
    try {
      const toMinute = (time: string): number => {
        const timeFrom = time?.split("-")[0]?.trim() ?? "";

        const time_start = differenceInMinutes(
          parse(timeFrom ?? "", "HH:mm", new Date()),
          parse("00:00", "HH:mm", new Date()),
        );
        return time_start;
      };

      const conflicts: Course[] = [];
      courses.map((course) => {
        const courseStartTime = toMinute(course.time_from);
        const courseEndTime = toMinute(course.time_to);
        for (const c of get().courses) {
          const cStartTime = toMinute(c.time_from);
          const cEndTime = toMinute(c.time_to);
          if (
            c.day_w.trim() === course.day_w.trim() &&
            ((cStartTime >= courseStartTime && cStartTime < courseEndTime) ||
              (cEndTime > courseStartTime && cEndTime <= courseEndTime) ||
              (cStartTime <= courseStartTime && cEndTime >= courseEndTime))
          ) {
            conflicts.push(c);
          }
        }
      });

      return conflicts;
    } catch (error) {
      return [];
    }
  },
  onHidden: (course: Course) => {
    const currentCourses = get().courses;

    const newCourses = _.map(currentCourses, (courseMap) => {
      if (
        courseMap.subject_code === course.subject_code &&
        courseMap.section_code === course.section_code
      ) {
        return { ...courseMap, is_hidden: true };
      }
      return courseMap;
    });

    set({ courses: newCourses });
  },
  onShow: (course: Course) => {
    const currentCourses = get().courses;

    const newCourses = _.map(currentCourses, (courseMap) => {
      if (
        courseMap.subject_code === course.subject_code &&
        courseMap.section_code === course.section_code
      ) {
        return { ...courseMap, is_hidden: false };
      }
      return courseMap;
    });

    set({ courses: newCourses });
  },
  checkIsChange: (course: Course[]) => {
    const hashNew = CryptoJS.SHA256(JSON.stringify(course)).toString(
      CryptoJS.enc.Hex,
    );
    const hashOld = CryptoJS.SHA256(
      JSON.stringify(get().getCoursesForSave()),
    ).toString(CryptoJS.enc.Hex);
    return hashNew !== hashOld;
  },
}));

export default useCoursePlanningStore;
