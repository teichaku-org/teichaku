import { useEffect, useState } from "react"
import { Contract, ethers } from "ethers";
import useMetaMask, { getContract, getContractWithSigner } from "../../web3/useMetaMask";
import artifact from "../../../abi/token/DAOToken.sol/DAOToken.json";
import { useAtom } from "jotai";
import { TokenNameAtom, TokenSymbolAtom, TokenTotalSupplyAtom, TreasuryBalanceAtom, YourBalanceAtom } from "@/domains/atoms/TokenAtom";
import { PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import usePoll from "../usePoll";
import { useDaoTokenInterface } from "../interface/useDaoTokenInterface";

interface Props {
    daoId: string
    projectId: string
}
const useDaoTokenWeb2: useDaoTokenInterface = (props: Props) => {
    const [tokenName, setTokenName] = useAtom(TokenNameAtom);
    const [tokenSymbol, setTokenSymbol] = useAtom(TokenSymbolAtom);
    const [tokenTotalSupply, setTokenTotalSupply] = useAtom(TokenTotalSupplyAtom);
    const [yourBalance, setYourBalance] = useAtom(YourBalanceAtom);
    const [treasuryBalance, setTreasuryBalance] = useAtom(TreasuryBalanceAtom)
    const [pollAddress] = useAtom(PollContractAddress)
    const contractAddress = ""


    const load = async () => {

    }


    const sendToken = async (to: string, amount: number) => {
    }

    return {
        load,
        tokenName,
        tokenSymbol,
        tokenTotalSupply,
        yourBalance,
        contractAddress,
        treasuryBalance,
        sendToken
    };
}

export default useDaoTokenWeb2;