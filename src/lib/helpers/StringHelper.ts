export class StringHelper {
   public static capitalizeFirstLetter = (str: string): string => {
      return str.charAt(0).toUpperCase() + str.slice(1);
   };

   public static capitalizeFirstLetterOfEachWord = (str: string): string => {
      return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
   };
}
