import { CookieModel } from "@/lib/models/CookieModel";

export const SetCookieQuery = async (cookie: Partial<CookieModel>): Promise<Partial<CookieModel>> => {
   const fetchReturn = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/cookies`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(cookie),
   });
   const returnCookie = (await fetchReturn.json()) as Partial<CookieModel>;

   return returnCookie;
};
