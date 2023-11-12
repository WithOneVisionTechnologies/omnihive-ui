import {
   OH_COOKIE_NAME,
   OH_THEME_APPEARANCE,
   OH_THEME_BROWSER_PREFERS_DARK,
   OH_THEME_COLOR,
   cookieOptions,
} from "@/lib/GlobalConstants";
import { IsHelper } from "@/lib/helpers/IsHelper";
import { ConfigService } from "@/lib/services/ConfigService";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { AwaitHelper } from "./lib/helpers/AwaitHelper";
import { CookieModel } from "./lib/models/CookieModel";
import { EncryptQuery } from "./lib/queries/crypto/EncryptQuery";

export default authMiddleware({
   afterAuth: async (auth, req, _evt) => {
      /* Auth Management */
      if (!auth.userId && !auth.isPublicRoute) {
         return redirectToSignIn({ returnBackUrl: req.url });
      }

      /* Redirects */
      const url = new URL(req.url);

      if (url.pathname === "/") {
         return NextResponse.redirect(new URL("/data", req.url));
      }

      /* Cookie Management */
      const response = NextResponse.next();

      if (
         IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(req.cookies.get(OH_COOKIE_NAME)) ||
         !req.cookies.has(OH_COOKIE_NAME)
      ) {
         const newCookie: CookieModel = {
            themeColor: OH_THEME_COLOR,
            themeAppearance: OH_THEME_APPEARANCE,
            browserPrefersDark: OH_THEME_BROWSER_PREFERS_DARK,
         };

         const encryptedCookie = await AwaitHelper.execute(EncryptQuery(JSON.stringify(newCookie)));

         response.cookies.set({
            ...cookieOptions,
            name: OH_COOKIE_NAME,
            value: encryptedCookie,
         });
      }

      /* Config Check */
      const configService = new ConfigService();

      /* Environment Variable Check */
      const { envVariablesStatus } = configService.buildEnvVariables();

      if (envVariablesStatus === "error" && !url.pathname.startsWith("/status")) {
         return NextResponse.redirect(new URL("/status", req.url));
      }

      /* Config DB Check */
      const configDbStatus = await configService.checkConfigDatabaseConnection();

      if (configDbStatus === false && !url.pathname.startsWith("/status")) {
         return NextResponse.redirect(new URL("/status", req.url));
      }

      return response;
   },
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
