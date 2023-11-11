export const menuTabsList = ["admin", "data", "content"] as const;

export type MenuTab = (typeof menuTabsList)[number];

export enum MenuTabEnum {
   Admin = "admin",
   Data = "data",
   Content = "content",
}
