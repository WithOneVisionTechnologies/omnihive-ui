import { atom } from "jotai";
import { MenuTab } from "../enums/MenuTabEnum";

export const activeHeaderTabState = atom<MenuTab>("data");
