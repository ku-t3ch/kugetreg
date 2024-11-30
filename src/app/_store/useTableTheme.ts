import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import DefaultTheme from "../_components/TableTheme/DefaultTheme/DefaultTheme";
import Theme01 from "../_components/TableTheme/Theme01/Theme01";

export const listTheme = {
  DefaultTheme: DefaultTheme,
  Theme01: Theme01,
};

type Store = {
  currentTheme: string;
  getThemeList: () => Record<string, any>;
  setTheme: (theme: string) => void;
};

export const useBearStore = create(
  persist(
    (set, get) => ({
      currentTheme: "DefaultTheme",
      getThemeList: () => listTheme,
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
