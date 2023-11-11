import { CookieModel } from "@/lib/models/CookieModel";

export const GetCookieQuery = async (): Promise<Partial<CookieModel>> => {
   const fetchReturn = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/cookies`, {
      method: "GET",
   });
   const returnCookie = (await fetchReturn.json()) as Partial<CookieModel>;

   return returnCookie;
};
