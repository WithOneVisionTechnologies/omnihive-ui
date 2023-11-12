import { AwaitHelper } from "@/lib/helpers/AwaitHelper";

export const DecryptQuery = async (text: string): Promise<string> => {
   const fetchReturn = await AwaitHelper.execute(
      fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/crypto/decrypt`, {
         method: "POST",
         headers: {
            "Content-Type": "text/plain; charset=UTF-8",
         },
         body: text,
      }),
   );

   const returnText = await AwaitHelper.execute(fetchReturn.text());

   return returnText;
};
