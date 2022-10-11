
import { DAOHistory } from "@/types";
import { DAOHistoryItemStructOutput } from "@/types/DAOHistory";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import artifact from "../../abi/DAOHistory.sol/DAOHistory.json";
import useMetaMask, { getContract, getContractWithSigner } from "../web3/useMetaMask";

export default () => {
    const [daoHistory, setDaoHistory] = useState<DAOHistoryItemStructOutput[]>([]);
    const { address } = useMetaMask()

    const contractAddress = process.env.NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string
    const contract = getContract(contractAddress, artifact.abi) as DAOHistory
    const contractWithSigner = getContractWithSigner(contractAddress, artifact.abi) as DAOHistory

    useEffect(() => {
        contract.functions.getDaoHistory("demo", "season1").then((res) => {
            setDaoHistory(res[0])
        })
    }, [address]);

    const _daoHistory = daoHistory.map(d => {
        return {
            contributionText: d.contributionText,
            reward: Number(ethers.utils.formatEther(d.reward)),
            role: d.roles[0], //TODO: ロールは複数持ちえる
            timestamp: new Date(Number(d.timestamp) * 1000).toLocaleString(),
            contributor: d.contributor
        }
    })
    return {
        daoHistory: _daoHistory
    };
}
