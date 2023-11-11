"use client";

import { IsHelper } from "@/lib/helpers/IsHelper";
import { GetCookieQuery } from "@/lib/queries/cookies/GetCookieQuery";
import { browserPrefersDarkState, themeAppearanceState, themeColorState } from "@/lib/stores/ThemeStore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const ThemeProvider = (props: { children: React.ReactNode }) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [, setThemeColor] = useAtom(themeColorState);
   const [, setThemeAppearance] = useAtom(themeAppearanceState);
   const [, setBrowserPrefersDark] = useAtom(browserPrefersDarkState);

   useEffect(() => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

      GetCookieQuery().then((cookie) => {
         if (!IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(cookie.themeColor)) {
            setThemeColor(cookie.themeColor);
         }

         if (!IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(cookie.themeAppearance)) {
            setThemeAppearance(cookie.themeAppearance);
         }

         setBrowserPrefersDark(prefersDark.matches);

         prefersDark.addEventListener("change", (event) => {
            setBrowserPrefersDark(event.matches);
         });

         setLoading(false);
      });
   }, []);

   if (loading) {
      return <></>;
   }

   return <>{props.children}</>;
};
