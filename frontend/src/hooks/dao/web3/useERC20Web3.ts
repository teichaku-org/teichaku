import { TokenNameAtom, TokenSymbolAtom, TokenTotalSupplyAtom } from "@/domains/atoms/TokenAtom";
import { Contract, ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import artifact from "../../../abi/token/DAOToken.sol/DAOToken.json";
import useMetaMask, { getContract, getContractWithSigner } from "../../web3/useMetaMask";
import { useERC20Interface } from "../interface/useERC20Interface";

interface Props {
    contractAddress: string
}
const useERC20Web3: useERC20Interface = (props: Props) => {
    const { contractAddress } = props
    const [tokenName, setTokenName] = useAtom(TokenNameAtom);
    const [tokenSymbol, setTokenSymbol] = useAtom(TokenSymbolAtom);
    const [tokenTotalSupply, setTokenTotalSupply] = useAtom(TokenTotalSupplyAtom);
    const { address, login } = useMetaMask()
    const [contract, setContract] = useState<Contract | null>(null)
    const [contractWithSigner, setContractWithSigner] = useState<Contract | null>(null)

    useEffect(() => {
        if (contractAddress) {
            setContract(getContract(contractAddress, artifact.abi) as Contract)
            setContractWithSigner(getContractWithSigner(contractAddress, artifact.abi) as Contract)
        }
    }, [contractAddress])

    const load = async () => {
        if (contract) {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum)
            contract.functions.name().then(n => setTokenName(n[0]));
            contract.functions.symbol().then(s => setTokenSymbol(s[0]));
            contract.functions.totalSupply().then(t => setTokenTotalSupply(Number(ethers.utils.formatEther(t[0]))));
        }
    }

    useEffect(() => {
        if (!(contract)) return
        load()
    }, [contract])


    return {
        load,
        tokenName,
        tokenSymbol,
        tokenTotalSupply,
    };
}

export default useERC20Web3;