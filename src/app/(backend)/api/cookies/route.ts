import { OH_COOKIE_NAME, cookieOptions } from "@/lib/GlobalConstants";
import { AwaitHelper } from "@/lib/helpers/AwaitHelper";
import { CookieModel } from "@/lib/models/CookieModel";
import { EncryptionService } from "@/lib/services/EncryptionService";
import { cookies } from "next/headers";

export async function GET(request: Request) {
   const cookieProvider = cookies();
   const encryptionService = new EncryptionService();
   let cookieReturn: Partial<CookieModel> = {};

   if (cookieProvider.has(OH_COOKIE_NAME)) {
      const encryptedCookie = cookieProvider.get(OH_COOKIE_NAME)?.value as string;
      const decryptedCookie = encryptionService.symmetricDecrypt(encryptedCookie);
      cookieReturn = JSON.parse(decryptedCookie);
   }

   return new Response(JSON.stringify({ cookieReturn }), {
      headers: { "content-type": "application/json; charset=UTF-8" },
   });
}

export async function POST(request: Request) {
   const cookieProvider = cookies();
   const encryptionService = new EncryptionService();
   let initialValue: Partial<CookieModel> = {};
   const res: Partial<CookieModel> = await AwaitHelper.execute(request.json());

   if (cookieProvider.has(OH_COOKIE_NAME)) {
      const encryptedCookie = cookieProvider.get(OH_COOKIE_NAME)?.value as string;
      const decryptedCookie = encryptionService.symmetricDecrypt(encryptedCookie);
      initialValue = JSON.parse(decryptedCookie);
   }

   const cookieValue = JSON.stringify({ ...initialValue, ...res });
   const encryptedCookie = encryptionService.symmetricEncrypt(cookieValue);
   cookieProvider.set(OH_COOKIE_NAME, encryptedCookie, cookieOptions);

   return new Response(JSON.stringify({ cookieValue }), {
      headers: { "content-type": "application/json; charset=UTF-8" },
   });
}
