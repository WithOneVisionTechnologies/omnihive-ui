import { AwaitHelper } from "@/lib/helpers/AwaitHelper";
import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

export const client = createClient({
   url: process.env.TURSO_CONFIG_DB_URL as string,
   authToken: process.env.TURSO_CONFIG_DB_AUTH_TOKEN as string,
});

export const db = drizzle(client);

async function main() {
   try {
      await AwaitHelper.execute(
         migrate(db, {
            migrationsFolder: "./migrations",
         }),
      );
      console.log("Tables migrated!");
      process.exit(0);
   } catch (error) {
      console.error("Error performing migration: ", error);
      process.exit(1);
   }
}

main();
