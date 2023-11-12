import { atom } from "jotai";
import { OH_THEME_APPEARANCE, OH_THEME_COLOR } from "../GlobalConstants";
import { ThemeAppearance } from "../enums/ThemeAppearanceEnum";
import { ThemeColor, themeColorList } from "../enums/ThemeColorEnum";
import { AwaitHelper } from "../helpers/AwaitHelper";
import { IsHelper } from "../helpers/IsHelper";
import { SetCookieQuery } from "../queries/cookies/SetCookieQuery.ts";

const themeColor = atom<ThemeColor>(OH_THEME_COLOR);
const themeAppearance = atom<ThemeAppearance>(OH_THEME_APPEARANCE);
const browserPrefersDark = atom<boolean>(true);

export const themeColorState = atom(
   (get) => get(themeColor),
   async (get, set, newThemeColor: ThemeColor) => {
      if (IsHelper.isNullOrUndefined(newThemeColor)) {
         return;
      }

      if (get(themeColor) === newThemeColor) {
         return;
      }

      set(themeColor, newThemeColor);
      await AwaitHelper.execute(SetCookieQuery({ themeColor: newThemeColor }));

      if (typeof window === "undefined") {
         return;
      }

      const root = window.document.documentElement;
      themeColorList.forEach((themeColor) => root.classList.remove(`theme-${themeColor}`));
      root.classList.add(`theme-${newThemeColor}`);
   },
);

export const themeAppearanceState = atom(
   (get) => get(themeAppearance),
   async (get, set, newThemeAppearance: ThemeAppearance) => {
      if (IsHelper.isNullOrUndefined(newThemeAppearance)) {
         return;
      }

      if (get(themeAppearance) === newThemeAppearance) {
         return;
      }

      set(themeAppearance, newThemeAppearance);
      await AwaitHelper.execute(SetCookieQuery({ themeAppearance: newThemeAppearance }));

      if (typeof window === "undefined") {
         return;
      }

      const root = window.document.documentElement;

      switch (newThemeAppearance) {
         case "dark":
            root.classList.remove("light");
            root.classList.add("dark");
            root.style.colorScheme = "dark";
            break;
         case "light":
            root.classList.remove("dark");
            root.classList.add("light");
            root.style.colorScheme = "light";
            break;
         case "system":
            root.classList.remove("dark");
            root.classList.remove("light");
            root.classList.add(`${get(browserPrefersDark) ? "dark" : "light"}`);
            root.style.colorScheme = `${get(browserPrefersDark) ? "dark" : "light"}`;
            break;
         default:
            root.classList.remove("dark");
            root.classList.remove("light");
            root.style.colorScheme = "light";
            break;
      }
   },
);

export const browserPrefersDarkState = atom(
   (get) => get(browserPrefersDark),
   async (get, set, newBrowserPrefersDark: boolean) => {
      if (IsHelper.isNullOrUndefined(newBrowserPrefersDark)) {
         return;
      }

      if (get(browserPrefersDark) === newBrowserPrefersDark) {
         return;
      }

      set(browserPrefersDark, newBrowserPrefersDark);
      await SetCookieQuery({ browserPrefersDark: newBrowserPrefersDark });

      if (get(themeAppearance) !== "system") {
         return;
      }

      if (typeof window === "undefined") {
         return;
      }

      const root = window.document.documentElement;

      switch (newBrowserPrefersDark) {
         case true:
            root.classList.remove("light");
            root.classList.add("dark");
            root.style.colorScheme = "dark";
            break;
         default:
            root.classList.remove("dark");
            root.classList.remove("light");
            root.style.colorScheme = "light";
            break;
      }
   },
);

export const themeIsDarkState = atom((get) => {
   switch (get(themeAppearance)) {
      case "dark":
         return true;
      case "light":
         return false;
      default:
         return get(browserPrefersDark);
   }
});
