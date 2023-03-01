import { atom } from "jotai"
import { DaoHistory } from "../DaoHistory"
import { DaoInfo } from "../DaoInfo"
import { PollDetail } from "../PollDetail"

export const PollDetailAtom = atom<PollDetail | undefined>(undefined)
export const ContributorRewardAtom = atom<number>(0)
export const VoterRewardAtom = atom<number>(0)
export const CommissionFeeAtom = atom<number>(0)
