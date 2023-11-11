export const themeAppearanceList = ["light", "dark", "system"] as const;

export type ThemeAppearance = (typeof themeAppearanceList)[number];

export enum ThemeAppearanceEnum {
   Light = "light",
   Dark = "dark",
   System = "system",
}
