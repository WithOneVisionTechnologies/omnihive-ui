import { atom } from "jotai";

export const currentPathState = atom<string>("/");
export const lastAdminPathState = atom<string>("/admin");
export const lastContentPathState = atom<string>("/content");
export const lastDataPathState = atom<string>("/data");

export const displayAdminTabsState = atom((get) => {
   if (get(currentPathState).startsWith("/status")) {
      return false;
   }

   if (get(currentPathState).startsWith("/setup")) {
      return false;
   }

   return true;
});
