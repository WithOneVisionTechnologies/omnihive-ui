import { ThemeAppearance } from "../enums/ThemeAppearanceEnum";
import { ThemeColor } from "../enums/ThemeColorEnum";

export type CookieModel = {
   activeUserId?: string;
   originalUserId?: string;
   themeColor: ThemeColor;
   themeAppearance: ThemeAppearance;
   browserPrefersDark: boolean;
};
