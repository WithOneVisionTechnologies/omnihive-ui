import { EncryptionHelper } from "@/lib/helpers/EncryptionHelper";

export async function POST(request: Request) {
   const text = await request.text();
   const decryptedText = EncryptionHelper.symmetricDecrypt(text);

   return new Response(decryptedText);
}
