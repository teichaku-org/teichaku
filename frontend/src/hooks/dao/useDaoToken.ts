import { useEffect, useState } from "react"
import { ethers } from "ethers";
import useMetaMask, { getContract } from "../web3/useMetaMask";
import artifact from "../../abi/token/DAOToken.sol/DAOToken.json";
import { useAtom } from "jotai";
import { TokenNameAtom, TokenSymbolAtom, TokenTotalSupplyAtom, YourBalanceAtom } from "@/domains/atoms/TokenAtom";
export default () => {
    const [tokenName, setTokenName] = useAtom(TokenNameAtom);
    const [tokenSymbol, setTokenSymbol] = useAtom(TokenSymbolAtom);
    const [tokenTotalSupply, setTokenTotalSupply] = useAtom(TokenTotalSupplyAtom);
    const [yourBalance, setYourBalance] = useAtom(YourBalanceAtom);

    const { address, login } = useMetaMask()
    const contractAddress = process.env.NEXT_PUBLIC_DAOTOKEN_CONTRACT_ADDRESS as string //TODO: ユーザがコントラクトアドレスを設定できるようにする
    const contract = getContract(contractAddress, artifact.abi)  //TODO: ERC20のinterfaceを作る

    const load = async () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const signer = provider.getSigner();
        contract.functions.name().then(n => setTokenName(n[0]));
        contract.functions.symbol().then(s => setTokenSymbol(s[0]));
        contract.functions.totalSupply().then(t => setTokenTotalSupply(Number(ethers.utils.formatEther(t[0]))));
        if (address) {
            contract.functions.balanceOf(signer.getAddress()).then(b => setYourBalance(Number(ethers.utils.formatEther(b[0]))));
        }
    }

    //TODO: DAOが変化したら再読み込みをするようにする
    useEffect(() => {
        load()
    }, [address])


    return { load, tokenName, tokenSymbol: tokenSymbol, tokenTotalSupply, yourBalance, contractAddress };
}