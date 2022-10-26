import { atom } from "jotai";

export const PollContractAddress = atom(process.env.NEXT_PUBLIC_POLL_CONTRACT_ADDRESS || "");
export const TokenContractAddress = atom(process.env.NEXT_PUBLIC_DAOTOKEN_CONTRACT_ADDRESS || "");