import { EncryptionHelper } from "@/lib/helpers/EncryptionHelper";

export async function POST(request: Request) {
   const text = await request.text();
   const encryptedText = EncryptionHelper.symmetricEncrypt(text);

   return new Response(encryptedText);
}
