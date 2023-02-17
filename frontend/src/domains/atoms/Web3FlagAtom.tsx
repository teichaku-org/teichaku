import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { atom } from "jotai";

export const Web3FlagAtom = atom<boolean>(true);
export const Web3AuthAtom = atom<Web3Auth | null>(null);
export const ProviderAtom = atom<SafeEventEmitterProvider | null>(null);