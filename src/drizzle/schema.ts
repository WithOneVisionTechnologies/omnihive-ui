import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dual = sqliteTable("dual", {
   dummy: text("dummy", { enum: ["X"] }).notNull(),
});

export const connectionTypes = sqliteTable("connection_types", {
   connectionTypeId: integer("connection_type_id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
   connectionTypeName: text("connection_type_name", { enum: ["mssql"] })
      .unique("connection_types_uq_connection_type_name")
      .notNull(),
});

export const connections = sqliteTable("connections", {
   connectionId: integer("connection_id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
   connectionTypeId: integer("connection_type_id", { mode: "number" })
      .notNull()
      .references(() => connectionTypes.connectionTypeId),
   connectionName: text("connection_name").unique("connections_uq_connection_name").notNull(),
});
