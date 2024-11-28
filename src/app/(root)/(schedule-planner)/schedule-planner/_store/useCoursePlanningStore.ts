import { create } from "zustand";
import { type Course } from "@/types/responses/IGroupCourseResponse";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course[]) => void;
  removeCourse: (course: Course) => void;
};

const useCoursePlanningStore = create(
  persist<Store>(
    (set, get) => ({
      courses: [],
      setCourses: (courses: Course[]) => set({ courses }),
      addCourse: (course: Course[]) => {
        const currentCourses = get().courses;
        const newCourses = [...currentCourses, ...course];
        set({ courses: newCourses });
      },
      removeCourse: (course: Course) => {
        const currentCourses = get().courses;
        const newCourses = currentCourses.filter(
          (c) => c.subject_code !== course.subject_code,
        );
        set({ courses: newCourses });
      },
    }),
    {
      name: "CoursePlanningStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCoursePlanningStore;
