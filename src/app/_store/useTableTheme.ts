import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import DefaultTheme from "../_components/TableTheme/Desktop/DefaultTheme/DefaultTheme";
import Theme01 from "../_components/TableTheme/Desktop/Theme01/Theme01";
import Theme02 from "../_components/TableTheme/Desktop/Theme02/Theme02";
import Theme01Mobile from "../_components/TableTheme/Mobile/Theme01Mobile/Theme01Mobile";

export const listTheme = {
  default_theme_desktop: DefaultTheme,
  theme01_desktop: Theme01,
  theme02_desktop: Theme02,
  theme01_mobile: Theme01Mobile,
};

type Store = {
  currentTheme: string;
  getThemeList: () => Record<string, any>;
  setTheme: (theme: string) => void;
};

export const useTableTheme = create(
  persist<Store>(
    (set, get) => ({
      currentTheme: "default_theme_desktop",
      getThemeList: () => listTheme,
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: "table-theme-v2",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
