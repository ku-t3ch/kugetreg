import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type Course } from "@/types/responses/IGroupCourseResponse";

type Store = {
  hiddenCourses: Course[];
  setHiddenCourses: (courses: Course[]) => void;
  onHiddenCourse: (course: Course) => void;
  onShowHiddenCourse: (course: Course) => void;
};

export const useHideCourseStore = create(
  persist<Store>(
    (set, get) => ({
      hiddenCourses: [],
      setHiddenCourses: (courses: Course[]) => set({ hiddenCourses: courses }),
      onHiddenCourse: (course: Course) => {
        const hiddenCourses = get().hiddenCourses;
        const newHiddenCourses = [...hiddenCourses, course];
        set({ hiddenCourses: newHiddenCourses });
      },
      onShowHiddenCourse: (course: Course) => {
        const hiddenCourses = get().hiddenCourses;
        const newHiddenCourses = hiddenCourses.filter((c) => c.subject_code !== course.subject_code);
        set({ hiddenCourses: newHiddenCourses });
      },
    }),
    {
      name: "hiddenCourses",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useHideCourseStore;
