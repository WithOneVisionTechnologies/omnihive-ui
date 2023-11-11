export const themeColorList = ["orange"] as const;

export type ThemeColor = (typeof themeColorList)[number];

export enum ThemeColorEnum {
   Orange = "orange",
}
