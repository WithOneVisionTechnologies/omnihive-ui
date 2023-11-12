import { AwaitHelper } from "@/lib/helpers/AwaitHelper";
import { EncryptionService } from "@/lib/services/EncryptionService";

export async function POST(request: Request) {
   const encryptionService = new EncryptionService();
   const text = await AwaitHelper.execute(request.text());
   const encryptedText = encryptionService.symmetricEncrypt(text);

   return new Response(encryptedText);
}
