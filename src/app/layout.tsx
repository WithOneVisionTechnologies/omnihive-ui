import { ClientProviders } from "@/components/providers/ClientProviders";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import {
   OH_COOKIE_NAME,
   OH_THEME_APPEARANCE,
   OH_THEME_BROWSER_PREFERS_DARK,
   OH_THEME_COLOR,
} from "@/lib/GlobalConstants";
import { CloudinaryFolders } from "@/lib/enums/CloudinaryFoldersEnum";
import { ThemeAppearance } from "@/lib/enums/ThemeAppearanceEnum";
import { ThemeColor } from "@/lib/enums/ThemeColorEnum";
import { IsHelper } from "@/lib/helpers/IsHelper";
import { CookieModel } from "@/lib/models/CookieModel";
import { EncryptionService } from "@/lib/services/EncryptionService";
import { MediaService } from "@/lib/services/MediaService";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "OmniHive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const cookieStore = cookies();
   const encryptionService = new EncryptionService();
   const mediaService = new MediaService();
   let browserPrefersDark: boolean = OH_THEME_BROWSER_PREFERS_DARK;
   let themeAppearance: ThemeAppearance = OH_THEME_APPEARANCE;
   let themeColor: ThemeColor = OH_THEME_COLOR;
   const cookie = cookieStore.get(OH_COOKIE_NAME);

   if (!IsHelper.isNullOrUndefined(cookie) && !IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(cookie.value)) {
      const decryptedValue = encryptionService.symmetricDecrypt(cookie.value);
      const cookieValue: Partial<CookieModel> = JSON.parse(decryptedValue);
      browserPrefersDark = cookieValue.browserPrefersDark ?? OH_THEME_BROWSER_PREFERS_DARK;
      themeAppearance = cookieValue.themeAppearance ?? OH_THEME_APPEARANCE;
      themeColor = cookieValue.themeColor ?? OH_THEME_COLOR;
   }

   return (
      <ClerkProvider>
         <html
            lang="en"
            className={cn(
               themeAppearance === "system" ? (browserPrefersDark === true ? "dark" : "light") : themeAppearance,
               `theme-${themeColor}`,
            )}
            style={{
               colorScheme:
                  themeAppearance === "system" ? (browserPrefersDark === true ? "dark" : "light") : themeAppearance,
            }}
            suppressHydrationWarning={true}
         >
            <head>
               <link
                  rel="icon"
                  type="image/png"
                  href={`${mediaService.getCloudinaryRoot(CloudinaryFolders.ApplicationLogos, 16)}/bee_${themeColor}_${
                     browserPrefersDark ? "dark" : "light"
                  }.png`}
               />
            </head>
            <body className={inter.className} suppressHydrationWarning={true}>
               <ClientProviders>
                  <ThemeProvider>{children}</ThemeProvider>
               </ClientProviders>
            </body>
         </html>
      </ClerkProvider>
   );
}
