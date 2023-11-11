export const dbTypesList = ["unknown", "mssql", "mysql", "postgres", "sqlite", "supabase"] as const;

export type DbType = (typeof dbTypesList)[number];

export enum DbTypeEnum {
   Unknown = "unknown",
   Mssql = "mssql",
   Mysql = "mysql",
   Postgres = "postgres",
   Sqlite = "sqlite",
   Supabase = "supabase",
}
