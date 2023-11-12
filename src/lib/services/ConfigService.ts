import { z } from "zod";
import * as schema from "../../drizzle/schema";
import {
   OH_CRYPTO_CIPHER,
   OH_CRYPTO_IV_LENGTH,
   OH_CRYPTO_RANDOM_CHARACTER_COUNT,
   cryptoCipherList,
} from "../GlobalConstants";
import { ConfigClient } from "../clients/ConfigClient";
import { EnvironmentVariableStatus } from "../enums/EnvironmentVariableStatusEnum";
import { AwaitHelper } from "../helpers/AwaitHelper";
import { IsHelper } from "../helpers/IsHelper";
import { EnvironmentVariableModel } from "../models/EnvironmentVariableModel";

export class ConfigService {
   public buildEnvVariables = (): {
      envVariables: EnvironmentVariableModel<string | number | boolean | undefined>[];
      envVariablesStatus: EnvironmentVariableStatus;
   } => {
      const envVariables: EnvironmentVariableModel<string | number | boolean | undefined>[] = [];
      let envVariablesStatus: EnvironmentVariableStatus = "ok";

      const CLERK_SECRET_KEY = new EnvironmentVariableModel<string>(
         "CLERK_SECRET_KEY",
         `The secret key to your Clerk instance`,
         process.env.CLERK_SECRET_KEY,
         z
            .string({
               required_error: "Clerk secret key is required",
               invalid_type_error: "Clerk secret key is not a valid string",
            })
            .trim()
            .min(1, "Clerk secret key is required"),
      );

      if (CLERK_SECRET_KEY.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(CLERK_SECRET_KEY);

      const NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = new EnvironmentVariableModel<string>(
         "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
         `The URL pathname to redirect once you are signed in.  Must be "/" to match the needs of the codebase.`,
         process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
         z.literal("/"),
      );

      if (NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL);

      const NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = new EnvironmentVariableModel<string>(
         "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
         `The URL pathname to redirect once you are signed up.  Must be "/" to match the needs of the codebase.`,
         process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
         z.literal("/"),
      );

      if (NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL);

      const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = new EnvironmentVariableModel<string>(
         "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
         `The publishable key to your Clerk instance.`,
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
         z
            .string({
               required_error: "Clerk publishable key is required",
               invalid_type_error: "Clerk publishable key is not a valid string",
            })
            .trim()
            .min(1, "Clerk publishable key is required"),
      );

      if (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

      const NEXT_PUBLIC_CLERK_SIGN_IN_URL = new EnvironmentVariableModel<string>(
         "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
         `The URL pathname to your app's sign-in page.  Must be "/sign-in" to match the needs of the codebase.`,
         process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
         z.literal("/sign-in"),
      );

      if (NEXT_PUBLIC_CLERK_SIGN_IN_URL.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(NEXT_PUBLIC_CLERK_SIGN_IN_URL);

      const NEXT_PUBLIC_CLERK_SIGN_UP_URL = new EnvironmentVariableModel<string>(
         "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
         `The URL pathname to your app's sign-up page.  Must be "/sign-up" to match the needs of the codebase.`,
         process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
         z.literal("/sign-up"),
      );

      if (NEXT_PUBLIC_CLERK_SIGN_UP_URL.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(NEXT_PUBLIC_CLERK_SIGN_UP_URL);

      const NEXT_PUBLIC_ROOT_URL = new EnvironmentVariableModel<string>(
         "NEXT_PUBLIC_ROOT_URL",
         `The public URL to your application.`,
         process.env.NEXT_PUBLIC_ROOT_URL,
         z
            .string({
               required_error: "Root URL is required",
               invalid_type_error: "Root URL is not a valid string",
            })
            .trim()
            .min(1, "Root URL is required")
            .url("Root URL is not a valid URL"),
      );

      if (NEXT_PUBLIC_ROOT_URL.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(NEXT_PUBLIC_ROOT_URL);

      const TURSO_CONFIG_DB_AUTH_TOKEN = new EnvironmentVariableModel<string>(
         "TURSO_CONFIG_DB_AUTH_TOKEN",
         `The auth token to your Turso config database.`,
         process.env.TURSO_CONFIG_DB_AUTH_TOKEN,
         z
            .string({
               required_error: "Turso config database auth token is required",
               invalid_type_error: "Turso config database auth token is not a valid string",
            })
            .trim()
            .min(1, "Turso config database auth token is required"),
      );

      if (TURSO_CONFIG_DB_AUTH_TOKEN.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(TURSO_CONFIG_DB_AUTH_TOKEN);

      const TURSO_CONFIG_DB_URL = new EnvironmentVariableModel<string>(
         "TURSO_CONFIG_DB_URL",
         `The public URL to your Turso config database.`,
         process.env.TURSO_CONFIG_DB_URL,
         z
            .string({
               required_error: "Turso config database URL is required",
               invalid_type_error: "Turso config database URL is not a valid string",
            })
            .trim()
            .min(1, "Turso config database URL is required")
            .url("Turso config database URL is not a valid URL"),
      );

      if (TURSO_CONFIG_DB_URL.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(TURSO_CONFIG_DB_URL);

      const OMNIHIVE_ADMIN_USERNAME = new EnvironmentVariableModel<string>(
         "OMNIHIVE_ADMIN_USERNAME",
         `The username to use for the initial admin user.`,
         process.env.OMNIHIVE_ADMIN_USERNAME,
         z
            .string({
               required_error: "Initial admin username is required",
               invalid_type_error: "Initial admin username is not a valid email",
            })
            .trim()
            .min(1, "Initial admin username is required")
            .email("Initial admin username is not a valid email"),
      );

      if (OMNIHIVE_ADMIN_USERNAME.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(OMNIHIVE_ADMIN_USERNAME);

      const OMNIHIVE_CRYPTO_CIPHER = new EnvironmentVariableModel<string>(
         "OMNIHIVE_CRYPTO_CIPHER",
         `The cipher to use for encrypting and decrypting data.  The default value will be assumed as "${OH_CRYPTO_CIPHER}" if no value is provided.`,
         process.env.OMNIHIVE_CRYPTO_CIPHER,
         z
            .string()
            .optional()
            .transform((val, ctx) => {
               let returnValue = val;

               if (IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(returnValue)) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: `INFO: Environment variable was not provided. Defaulting to "${OH_CRYPTO_CIPHER}"`,
                  });

                  returnValue = OH_CRYPTO_CIPHER;
               }

               if (cryptoCipherList.indexOf(returnValue) === -1) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: `Crypto cipher is not supported. Please use a node-supported crypto cipher.  See https://nodejs.org/api/crypto.html for more information.`,
                  });
               }

               return returnValue;
            }),
      );

      if (OMNIHIVE_CRYPTO_CIPHER.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(OMNIHIVE_CRYPTO_CIPHER);

      const OMNIHIVE_CRYPTO_IV_LENGTH = new EnvironmentVariableModel<number>(
         "OMNIHIVE_CRYPTO_IV_LENGTH",
         `The IV length to use for encrypting and decrypting data.  The default value will be assumed as "${OH_CRYPTO_IV_LENGTH}" if no value is provided.`,
         process.env.OMNIHIVE_CRYPTO_IV_LENGTH,
         z
            .string()
            .optional()
            .transform((val, ctx) => {
               let returnValue = val;

               if (IsHelper.isNullOrUndefined(returnValue)) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: `INFO: Environment variable was not provided. Defaulting to "${OH_CRYPTO_IV_LENGTH}"`,
                  });

                  returnValue = OH_CRYPTO_IV_LENGTH.toString();
               }

               if (!IsHelper.isNumber(returnValue)) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Crypto IV length is not a valid number",
                  });

                  return returnValue;
               }

               if (returnValue <= 0) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Crypto IV length cannot be less than or equal to 0",
                  });

                  return returnValue;
               }

               if (returnValue % 16 !== 0) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Crypto IV length is not a multiple of 16",
                  });

                  return returnValue;
               }

               if (returnValue > 256) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Crypto IV length is too long",
                  });

                  return returnValue;
               }

               return returnValue;
            }),
      );

      if (OMNIHIVE_CRYPTO_IV_LENGTH.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(OMNIHIVE_CRYPTO_IV_LENGTH);

      const OMNIHIVE_CRYPTO_KEY = new EnvironmentVariableModel<string>(
         "OMNIHIVE_CRYPTO_KEY",
         `The key to use for encrypting and decrypting data.`,
         process.env.OMNIHIVE_CRYPTO_KEY,
         z
            .string({
               required_error: "Crypto key is required",
               invalid_type_error: "Crypto key is not a valid string",
            })
            .trim()
            .min(1, "Crypto key is required")
            .transform((val, ctx) => {
               let returnValue = val;

               if (returnValue.length !== 32) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: `INFO: Crypto key is not 32 characters long.  Unless you are customizing the encryption/decryption cipher and iv, this is not recommended.`,
                  });
               }

               return returnValue;
            }),
      );

      if (OMNIHIVE_CRYPTO_KEY.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(OMNIHIVE_CRYPTO_KEY);

      const OMNIHIVE_CRYPTO_RANDOM_CHARACTER_COUNT = new EnvironmentVariableModel<number>(
         "OMNIHIVE_CRYPTO_RANDOM_CHARACTER_COUNT",
         `The number of random characters to use for encrypting and decrypting data.  The default value will be assumed as "${OH_CRYPTO_RANDOM_CHARACTER_COUNT}" if no value is provided.`,
         process.env.OMNIHIVE_CRYPTO_RANDOM_CHARACTER_COUNT,
         z
            .string()
            .optional()
            .transform((val, ctx) => {
               let returnValue = val;

               if (IsHelper.isNullOrUndefined(returnValue)) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: `INFO: Environment variable was not provided. Defaulting to "${OH_CRYPTO_RANDOM_CHARACTER_COUNT}"`,
                  });

                  returnValue = OH_CRYPTO_IV_LENGTH.toString();
               }

               if (!IsHelper.isNumber(returnValue)) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Crypto random character count is not a valid number",
                  });

                  return returnValue;
               }

               if (returnValue <= 0) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Crypto random character count cannot be less than or equal to 0",
                  });

                  return returnValue;
               }

               return returnValue;
            }),
      );

      if (OMNIHIVE_CRYPTO_RANDOM_CHARACTER_COUNT.status === "error") {
         envVariablesStatus = "error";
      }

      envVariables.push(OMNIHIVE_CRYPTO_RANDOM_CHARACTER_COUNT);

      return { envVariables, envVariablesStatus };
   };

   public checkConfigDatabaseConnection = async (): Promise<boolean> => {
      const configClient = ConfigClient.getInstance();

      try {
         const result = await AwaitHelper.execute(configClient.db.select().from(schema.dual).limit(1));
         if (result.length === 0) {
            return false;
         }

         if (result[0].dummy !== "X") {
            return false;
         }

         return true;
      } catch (error) {
         return false;
      }
   };
}
