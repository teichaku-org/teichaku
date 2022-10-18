import { atom } from "jotai";
import { DaoHistory } from "../DaoHistory";
import { DaoInfo } from "../DaoInfo";
import { PollDetail } from "../PollDetail";

export const PollDetailAtom = atom<PollDetail | undefined>(undefined);
