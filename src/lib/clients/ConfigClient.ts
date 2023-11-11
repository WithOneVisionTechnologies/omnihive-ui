import { Client, createClient } from "@libsql/client";
import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";

export class ConfigClient {
   private static instance: ConfigClient;
   public client: Client;
   public db: LibSQLDatabase;

   private constructor() {
      this.client = createClient({
         url: process.env.TURSO_CONFIG_DB_URL ?? "",
         authToken: process.env.TURSO_CONFIG_DB_AUTH_TOKEN ?? "",
      });
      

      this.db = drizzle(this.client);
   }

   public static getInstance(): ConfigClient {
      if (!ConfigClient.instance) {
         ConfigClient.instance = new ConfigClient();
      }

      return ConfigClient.instance;
   }
}
