import { IsHelper } from "./IsHelper";

export class ArrayHelper {
   public static objectArrayOrderBy = <T>(array: T[], keys: string[], directions: orderByDirection[]): T[] => {
      return array.sort((a: any, b: any) => {
         let i = 0;
         let result = 0;
         const length = keys.length;

         while (result === 0 && i < length) {
            const key = keys[i];
            const direction = directions[i];

            result =
               direction === "desc"
                  ? b[key as keyof T].toString().localeCompare(a[key as keyof T].toString())
                  : a[key as keyof T].toString().localeCompare(b[key as keyof T].toString());
            i++;
         }

         return result;
      });
   };

   public static objectArrayUniqueBy = <T>(array: T[], key?: string): T[] => {
      if (IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(key)) {
         return array.filter((value, index, arr) => arr.findIndex((x) => value === x) === index);
      }

      return array.filter(
         (value, index, arr) => arr.findIndex((x) => value[key as keyof T] === x[key as keyof T]) === index,
      );
   };

   public static stringArrayOrderBy = (array: string[] | readonly string[], direction: orderByDirection): string[] => {
      const newArray = [...array];
      return newArray.sort((a: any, b: any) => {
         return direction === "desc" ? b.localeCompare(a) : a.localeCompare(b);
      });
   };
}

export type orderByDirection = "asc" | "desc";
