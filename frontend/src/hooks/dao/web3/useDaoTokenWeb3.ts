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
const useDaoTokenWeb3: useDaoTokenInterface = (props: Props) => {
    const [tokenName, setTokenName] = useAtom(TokenNameAtom);
    const [tokenSymbol, setTokenSymbol] = useAtom(TokenSymbolAtom);
    const [tokenTotalSupply, setTokenTotalSupply] = useAtom(TokenTotalSupplyAtom);
    const [yourBalance, setYourBalance] = useAtom(YourBalanceAtom);
    const [treasuryBalance, setTreasuryBalance] = useAtom(TreasuryBalanceAtom)
    const [pollAddress] = useAtom(PollContractAddress)


    usePoll({ daoId: props.daoId, projectId: props.projectId })

    const { address } = useMetaMask()

    const [contractAddress] = useAtom(TokenContractAddress)
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
            const signer = provider.getSigner();
            contract.functions.name().then(n => setTokenName(n[0]));
            contract.functions.symbol().then(s => setTokenSymbol(s[0]));
            contract.functions.totalSupply().then(t => setTokenTotalSupply(Number(ethers.utils.formatEther(t[0]))));
            if (address) {
                contract.functions.balanceOf(signer.getAddress()).then(b => setYourBalance(Number(ethers.utils.formatEther(b[0]))));
            }
            contract.functions.balanceOf(pollAddress).then(b => setTreasuryBalance(Number(ethers.utils.formatEther(b[0]))));
        }
    }

    useEffect(() => {
        if (!(contract && props.daoId && props.projectId)) return
        load()
    }, [contract, props.daoId, props.projectId])

    const sendToken = async (to: string, amount: number) => {
        if (!contractWithSigner) return
        contractWithSigner.functions.transfer(to, ethers.utils.parseEther(amount.toString()))
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

export default useDaoTokenWeb3;