import { atom } from "jotai";
import { DaoHistory } from "../DaoHistory";
import { DaoInfo } from "../DaoInfo";

export const DaoInfoAtom = atom<DaoInfo | undefined>(undefined);
