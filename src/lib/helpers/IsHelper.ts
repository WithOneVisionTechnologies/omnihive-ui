export class IsHelper {
   public static isArray = <T = unknown>(value: unknown): value is T[] => {
      if (this.isNullOrUndefined(value)) {
         return false;
      }

      return Array.isArray(value);
   };

   public static isBoolean = (value: unknown): value is boolean => {
      return (
         (typeof value === "boolean" && (value === true || value === false)) ||
         (typeof value === "string" && (value === "true" || value === "false")) ||
         value === "Y" ||
         value === "y" ||
         value === "N" ||
         value === "n" ||
         value === 1 ||
         value === 0
      );
   };

   public static getBooleanValue = (value: unknown): boolean => {
      if (!this.isBoolean(value)) {
         return false;
      }

      return (
         (typeof value === "boolean" && value === true) ||
         (typeof value === "string" && value === "true") ||
         (value as unknown) === "Y" ||
         (value as unknown) === "y" ||
         (value as unknown) === "Yes" ||
         (value as unknown) === "yes" ||
         (value as unknown) === 1
      );
   };

   public static isDate = (value: unknown): value is Date => {
      return Object.prototype.toString.call(value) === "[object Date]";
   };

   public static isEmptyArray = (value: unknown): boolean => {
      return IsHelper.isArray(value) && value.length === 0;
   };

   public static isEmptyObject = (value: unknown): boolean => {
      return IsHelper.isObject(value) && Object.keys(value).length === 0;
   };

   public static isEmptyString = (value: unknown): boolean => {
      return IsHelper.isString(value) && String(value).length === 0;
   };

   public static isEmptyStringOrWhitespace = (value: unknown): boolean => {
      return IsHelper.isEmptyString(value) || IsHelper.isWhiteSpaceString(value);
   };

   public static isFunction = (value: unknown): value is Function => {
      return typeof value === "function";
   };

   public static isIpv4 = (value: unknown): boolean => {
      if (typeof value !== "string") {
         return false;
      }

      const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;

      return regex.test(value);
   };

   public static isNull = (value: unknown): value is null => {
      return value === null;
   };

   public static isNullOrUndefined = (value: unknown): value is null | undefined => {
      return IsHelper.isNull(value) || IsHelper.isUndefined(value);
   };

   public static isNullOrUndefinedOrEmptyStringOrWhitespace = (value: unknown): value is null | undefined | "" => {
      return IsHelper.isNullOrUndefined(value) || IsHelper.isEmptyStringOrWhitespace(value);
   };

   public static isNumber = (value: unknown): value is number => {
      if (IsHelper.isNullOrUndefined(value)) {
         return false;
      }

      if (Number.isNaN(Number.parseFloat(`${value}`))) {
         return false;
      }

      if (typeof value === "number") {
         return true;
      }

      if (typeof value !== "string") {
         return false;
      }

      if (IsHelper.isEmptyStringOrWhitespace(value)) {
         return false;
      }

      const regex = /^[0-9]*$/g;

      return regex.test(String(value));
   };

   public static isInteger = (value: unknown): value is number => {
      if (!IsHelper.isNumber(value)) {
         return false;
      }

      if (!Number.isInteger(Number.parseFloat(value.toString()))) {
         return false;
      }

      return true;
   };

   public static isPositiveInteger = (value: unknown): value is number => {
      if (!IsHelper.isInteger(value)) {
         return false;
      }

      if (value <= 0) {
         return false;
      }

      return true;
   };

   public static isObject = (value: unknown): value is object => {
      return (
         !IsHelper.isNull(value) &&
         (typeof value === "object" ||
            IsHelper.isFunction(value) ||
            Object.prototype.toString.call(value) === "[object Object]")
      );
   };

   public static isPlainObject = <T = unknown>(value: unknown): value is Record<string | number | symbol, T> => {
      if (!this.isObject(value)) {
         return false;
      }

      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.getPrototypeOf({});
   };

   public static isString = (value: unknown): value is string => {
      return typeof value === "string";
   };

   public static isUndefined = (value: unknown): value is undefined => {
      return typeof value === "undefined" || value === undefined;
   };

   public static isWhiteSpaceString = (value: unknown): value is string => {
      return IsHelper.isString(value) && !IsHelper.isEmptyString(value) && !/\S/.test(String(value));
   };
}
