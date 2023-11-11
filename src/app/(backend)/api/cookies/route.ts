import { OH_COOKIE_NAME, cookieOptions } from "@/lib/GlobalConstants";
import { EncryptionHelper } from "@/lib/helpers/EncryptionHelper";
import { CookieModel } from "@/lib/models/CookieModel";
import { cookies } from "next/headers";

export async function GET(request: Request) {
   const cookieProvider = cookies();
   let cookieReturn: Partial<CookieModel> = {};

   if (cookieProvider.has(OH_COOKIE_NAME)) {
      const encryptedCookie = cookieProvider.get(OH_COOKIE_NAME)?.value as string;
      const decryptedCookie = EncryptionHelper.symmetricDecrypt(encryptedCookie);
      cookieReturn = JSON.parse(decryptedCookie);
   }

   return new Response(JSON.stringify({ cookieReturn }), {
      headers: { "content-type": "application/json; charset=UTF-8" },
   });
}

export async function POST(request: Request) {
   const cookieProvider = cookies();
   let initialValue: Partial<CookieModel> = {};
   const res: Partial<CookieModel> = await request.json();

   if (cookieProvider.has(OH_COOKIE_NAME)) {
      const encryptedCookie = cookieProvider.get(OH_COOKIE_NAME)?.value as string;
      const decryptedCookie = EncryptionHelper.symmetricDecrypt(encryptedCookie);
      initialValue = JSON.parse(decryptedCookie);
   }

   const cookieValue = JSON.stringify({ ...initialValue, ...res });
   const encryptedCookie = EncryptionHelper.symmetricEncrypt(cookieValue);
   cookieProvider.set(OH_COOKIE_NAME, encryptedCookie, cookieOptions);

   return new Response(JSON.stringify({ cookieValue }), {
      headers: { "content-type": "application/json; charset=UTF-8" },
   });
}
