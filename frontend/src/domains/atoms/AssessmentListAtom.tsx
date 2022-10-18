import { atom } from "jotai";
import { Assessment } from "../Assessment";
import { DaoHistory } from "../DaoHistory";

export const AssessmentListAtom = atom<Assessment[]>([]);
