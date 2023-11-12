import { ConfigClient } from "@/lib/clients/ConfigClient";
import "dotenv/config";
import * as schema from "./schema";

const main = async () => {
   const db = ConfigClient.getInstance().db;

   try {
      db.insert(schema.dual).values({ dummy: "X" }).execute();
   } catch {
      console.log("dual already seeded");
   }

   try {
      db.insert(schema.connectionTypes).values({ connectionTypeName: "mssql" }).execute();
   } catch {
      console.log("connection_types already seeded");
   }

   console.log("Seeding complete");
};

main();
