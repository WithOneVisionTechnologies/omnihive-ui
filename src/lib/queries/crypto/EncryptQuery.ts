export const EncryptQuery = async (text: string): Promise<string> => {
   const fetchReturn = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/crypto/encrypt`, {
      method: "POST",
      headers: {
         "Content-Type": "text/plain; charset=UTF-8",
      },
      body: text,
   });
   const returnText = await fetchReturn.text();

   return returnText;
};
