import { atom } from "jotai";
import { Token } from "../Token";

export const TokenNameAtom = atom<string>("");
export const TokenSymbolAtom = atom<string>("");
export const TokenTotalSupplyAtom = atom<number>(0);
export const YourBalanceAtom = atom<number>(0);
export const TokenContractAddressAtom = atom<string>("");
export const TreasuryBalanceAtom = atom<number>(0);
