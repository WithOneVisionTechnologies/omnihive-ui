export const environmentVariableStatusList = ["ok", "error", "info", "warning", "unknown"] as const;

export type EnvironmentVariableStatus = (typeof environmentVariableStatusList)[number];

export enum EnvironmentVariableStatusEnum {
   Ok = "ok",
   Error = "error",
   Info = "info",
   Warning = "warning",
   Unknown = "unknown",
}
