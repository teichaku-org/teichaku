// doaId, projectIdから必要なコントラクトアドレス等を抽出する

import { DAOHistory, Poll } from "@/types";
import { getContract } from "../web3/useMetaMask";
import historyArtifact from "../../abi/DAOHistory.sol/DAOHistory.json";
import pollArtifact from "../../abi/Poll.sol/Poll.json";
import { useAtom } from "jotai";
import { PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import { ContributorRewardAtom, VoterRewardAtom } from "@/domains/atoms/PollDetailAtom";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useRouter } from "next/router";


export const useDaoLoad = () => {
    const router = useRouter()
    const { daoId: _daoId, projectId: _projectId } = router.query
    const daoId = _daoId as string
    const projectId = _projectId as string

    const contractAddress = process.env
        .NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string;
    const contract = getContract(contractAddress, historyArtifact.abi) as DAOHistory;
    const [____, setPollContractAddress] = useAtom(PollContractAddress)
    const [__, setContributorReward] = useAtom(ContributorRewardAtom);
    const [___, setVoterReward] = useAtom(VoterRewardAtom);
    const [_, setTokenContractAddress] = useAtom(TokenContractAddress)

    const load = async () => {
        const res = await contract.functions.pollAddress(daoId, projectId)
        const pollContractAddress = res[0]
        setPollContractAddress(pollContractAddress)
        const pollContract = getContract(pollContractAddress, pollArtifact.abi) as Poll

        pollContract.functions.daoTokenAddress().then((address) => {
            setTokenContractAddress(address[0])
        })
        pollContract.functions.CONTRIBUTOR_ASSIGNMENT_TOKEN().then((res) => {
            setContributorReward(Number(ethers.utils.formatEther(res[0])))
        })
        pollContract.functions.VOTER_ASSIGNMENT_TOKEN().then((res) => {
            setVoterReward(Number(ethers.utils.formatEther(res[0])))
        })
    }

    useEffect(() => {
        if (!(daoId && projectId)) return
        load()
    }, [daoId, projectId])
}