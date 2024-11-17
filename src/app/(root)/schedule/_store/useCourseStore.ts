import { type Course } from "@/types/responses/IGroupCourseResponse";
import { create } from "zustand";

type Store = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
};

const useCourseStore = create<Store>()((set) => ({
  courses: [],
  setCourses: (courses: Course[]) => set({ courses }),
}));

export default useCourseStore;
