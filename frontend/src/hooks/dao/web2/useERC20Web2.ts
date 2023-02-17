import { TokenNameAtom, TokenSymbolAtom, TokenTotalSupplyAtom } from "@/domains/atoms/TokenAtom";
import { Contract, ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useERC20Interface } from "../interface/useERC20Interface";

interface Props {
    contractAddress: string
}
const useERC20Web2: useERC20Interface = (props: Props) => {
    const load = async () => {
    }
    const tokenName = ""
    const tokenSymbol = ""
    const tokenTotalSupply = 0

    return {
        load,
        tokenName,
        tokenSymbol,
        tokenTotalSupply,
    };
}

export default useERC20Web2;