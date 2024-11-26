import { create } from "zustand";
import { type Course } from "@/types/responses/IGroupCourseResponse";

type Store = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
};

const useCourseStore = create<Store>()((set) => ({
  courses: [],
  setCourses: (courses: Course[]) => set({ courses }),
}));

export default useCourseStore;
