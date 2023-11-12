"use client";

import { CloudinaryFolders } from "@/lib/enums/CloudinaryFoldersEnum";
import { MenuTab } from "@/lib/enums/MenuTabEnum";
import { ThemeAppearance, themeAppearanceList } from "@/lib/enums/ThemeAppearanceEnum";
import { ThemeColor, themeColorList } from "@/lib/enums/ThemeColorEnum";
import { ArrayHelper } from "@/lib/helpers/ArrayHelper";
import { IsHelper } from "@/lib/helpers/IsHelper";
import { StringHelper } from "@/lib/helpers/StringHelper";
import { MediaService } from "@/lib/services/MediaService";
import { activeHeaderTabState } from "@/lib/stores/AppStore";
import {
   currentPathState,
   displayAdminTabsState,
   lastAdminPathState,
   lastContentPathState,
   lastDataPathState,
} from "@/lib/stores/NavigationStore";
import { themeAppearanceState, themeColorState, themeIsDarkState } from "@/lib/stores/ThemeStore";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useAtom } from "jotai";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CogSolidIcon } from "../icons/CogSolidIcon";
import { DatabaseSolidIcon } from "../icons/DatabaseSolidIcon";
import { EditSolidIcon } from "../icons/EditSolidIcon";
import { UserSettingsSolidIcon } from "../icons/UserSettingsSolidIcon";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Separator } from "../ui/separator";

export const MainHeader = () => {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const router = useRouter();
   const { isSignedIn } = useAuth();
   const mediaService = new MediaService();

   const [activeHeaderTab, setActiveHeaderTab] = useAtom(activeHeaderTabState);
   const [displayAdminTabs] = useAtom(displayAdminTabsState);
   const [themeAppearance, setThemeAppearance] = useAtom(themeAppearanceState);
   const [themeColor, setThemeColor] = useAtom(themeColorState);
   const [themeIsDark] = useAtom(themeIsDarkState);
   const [, setCurrentPath] = useAtom(currentPathState);
   const [lastAdminPath, setLastAdminPath] = useAtom(lastAdminPathState);
   const [lastContentPath, setLastContentPath] = useAtom(lastContentPathState);
   const [lastDataPath, setLastDataPath] = useAtom(lastDataPathState);

   const onAdminTabChange = (value: MenuTab) => {
      if (IsHelper.isNullOrUndefined(value)) {
         return;
      }

      if (value === "admin") {
         router.push(lastAdminPath);
      }

      if (value === "content") {
         router.push(lastContentPath);
      }

      if (value === "data") {
         router.push(lastDataPath);
      }
   };

   useEffect(() => {
      const allParams = searchParams.toString();
      let fullPath = pathname;

      if (allParams.length > 0) {
         fullPath += "?" + allParams;
      }

      setCurrentPath(fullPath);

      if (pathname.startsWith("/admin")) {
         setLastAdminPath(fullPath);
         setActiveHeaderTab("admin");
      }

      if (pathname.startsWith("/content")) {
         setLastContentPath(fullPath);
         setActiveHeaderTab("content");
      }

      if (pathname.startsWith("/data")) {
         setLastDataPath(fullPath);
         setActiveHeaderTab("data");
      }
   }, [pathname, searchParams]);

   return (
      <div
         className={cn(
            "z-50 grid justify-center border-b bg-secondary p-2",
            displayAdminTabs ? "grid-cols-3" : "grid-cols-2",
         )}
      >
         <a href="/" className="flex items-center">
            <div className="h-10 w-10">
               <Image
                  src={`${mediaService.getCloudinaryRoot(CloudinaryFolders.ApplicationLogos, 40)}/bee_${themeColor}_${
                     themeIsDark ? "dark" : "light"
                  }.png`}
                  alt="logo"
                  className="h-10 w-full"
                  suppressHydrationWarning={true}
                  width={40}
                  height={40}
               />
            </div>
            <div
               className={cn(
                  "ml-4 text-2xl font-bold text-neutral-700 dark:text-white",
                  displayAdminTabs ? "hidden md:block" : "",
               )}
            >
               OMNIHIVE
            </div>
         </a>
         {displayAdminTabs && (
            <div className="flex flex-1 items-center justify-center">
               <Button
                  disabled={activeHeaderTab === "data"}
                  className={cn(
                     "ml-1 mr-1 h-[inherit] !w-28 border-b-2 border-secondary bg-secondary p-2 text-center text-foreground disabled:opacity-100 md:w-20",
                     activeHeaderTab === "data" &&
                        "rounded-none border-b-primary hover:bg-secondary focus:bg-secondary active:bg-secondary",
                     activeHeaderTab !== "data" && "rounded-md",
                  )}
                  onClick={() => onAdminTabChange("data")}
               >
                  <DatabaseSolidIcon size={16} className="mr-0 text-white md:mr-2" />
                  <span className="hidden text-xs md:inline">Data</span>
               </Button>
               <Button
                  disabled={activeHeaderTab === "content"}
                  className={cn(
                     "ml-1 mr-1 h-[inherit] !w-28 border-b-2 border-secondary bg-secondary p-2 text-center text-foreground disabled:opacity-100 md:w-20",
                     activeHeaderTab === "content" &&
                        "rounded-none border-b-primary hover:bg-secondary focus:bg-secondary active:bg-secondary",
                     activeHeaderTab !== "content" && "rounded-md",
                  )}
                  onClick={() => onAdminTabChange("content")}
               >
                  <EditSolidIcon size={16} className="mr-0 text-white md:mr-2" />
                  <span className="hidden text-xs md:inline">Content</span>
               </Button>
               <Button
                  disabled={activeHeaderTab === "admin"}
                  className={cn(
                     "ml-1 mr-1 h-[inherit] !w-28 border-b-2 border-secondary bg-secondary p-2 text-center text-foreground disabled:opacity-100 md:w-20",
                     activeHeaderTab === "admin" &&
                        "rounded-none border-b-primary hover:bg-secondary focus:bg-secondary active:bg-secondary",
                     activeHeaderTab !== "admin" && "rounded-md",
                  )}
                  onClick={() => onAdminTabChange("admin")}
               >
                  <CogSolidIcon size={16} className="mr-0 text-white md:mr-2" />
                  <span className="hidden text-xs md:inline">Admin</span>
               </Button>
            </div>
         )}
         <div className="ml-auto flex items-center justify-center">
            <div className="mr-1">
               {" "}
               <div className="flex flex-1 items-center justify-center">
                  <Popover>
                     <PopoverTrigger className="rounded-full p-2 shadow-none focus:shadow-ring data-[state=open]:shadow-ring">
                        <UserSettingsSolidIcon size={22} />
                     </PopoverTrigger>
                     <PopoverContent onOpenAutoFocus={(evt) => evt.preventDefault()}>
                        <div className="flex w-full flex-col">
                           <div className="text-lg font-bold">Theme</div>
                           <Separator className="mb-1 mt-2" />
                           <div className="mt-3 flex flex-row items-center">
                              <div>Color</div>
                              <div className="ml-auto">
                                 <Select
                                    onValueChange={(value) => setThemeColor(value as ThemeColor)}
                                    value={themeColor}
                                 >
                                    <SelectTrigger placeholder="Color" className="w-32">
                                       {StringHelper.capitalizeFirstLetterOfEachWord(themeColor)}
                                    </SelectTrigger>
                                    <SelectContent>
                                       {ArrayHelper.stringArrayOrderBy(themeColorList, "asc").map((color) => (
                                          <SelectItem key={color} value={color}>
                                             {StringHelper.capitalizeFirstLetterOfEachWord(color)}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>
                           <div className="mt-4 flex flex-row items-center">
                              <div>Appearance</div>
                              <div className="ml-auto">
                                 <Select
                                    onValueChange={(value) => setThemeAppearance(value as ThemeAppearance)}
                                    value={themeAppearance}
                                 >
                                    <SelectTrigger placeholder="Appearance" className="w-32">
                                       {StringHelper.capitalizeFirstLetterOfEachWord(themeAppearance)}
                                    </SelectTrigger>
                                    <SelectContent>
                                       {ArrayHelper.stringArrayOrderBy(themeAppearanceList, "asc").map((appearance) => (
                                          <SelectItem key={appearance} value={appearance}>
                                             {StringHelper.capitalizeFirstLetterOfEachWord(appearance)}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>
                        </div>
                     </PopoverContent>
                  </Popover>
               </div>
            </div>
            <div>
               {isSignedIn && (
                  <div className="rounded-full p-2 focus:shadow-ring">
                     <UserButton afterSignOutUrl="/" appearance={themeIsDark ? { baseTheme: dark } : {}} />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
