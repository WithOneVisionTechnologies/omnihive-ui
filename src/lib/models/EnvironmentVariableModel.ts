import { EnvironmentVariableStatus } from "@/lib/enums/EnvironmentVariableStatusEnum";
import type { z } from "zod";

export class EnvironmentVariableModel<T> {
   constructor(name: string, description: string, value: string | undefined, schema: z.ZodType<string | undefined>) {
      this.name = name;
      this.description = description;
      this.schema = schema;

      const result = this.schema.safeParse(value);

      if (result.success === true) {
         this.status = "ok";
         this.value = result.data as T;
         return;
      }

      if (result.error.errors[0].message.startsWith("INFO:")) {
         this.status = "info";
         this.value = undefined;
         this.error = result.error.errors[0].message.replace("INFO: ", "");
         result.error.errors.shift();
         return;
      }

      if (result.error.errors[0].message.startsWith("WARN:")) {
         this.status = "warning";
         this.value = undefined;
         this.error = result.error.errors[0].message.replace("WARN: ", "");
         return;
      }

      this.status = "error";
      this.value = undefined;
      this.error = result.error.errors[0].message;
   }

   name: string | undefined = undefined;
   description: string | undefined = undefined;
   schema: z.ZodType<string | undefined>;
   status: EnvironmentVariableStatus = "unknown";
   value: T | undefined = undefined;
   error: string | undefined = undefined;
}
