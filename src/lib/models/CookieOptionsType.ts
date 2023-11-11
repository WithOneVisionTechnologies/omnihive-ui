export type CookieOptionsType = {
   domain?: string;
   expires?: Date;
   httpOnly?: boolean;
   maxAge?: number;
   path?: string;
   sameSite?: boolean | "lax" | "strict" | "none";
   secure?: boolean;
};
