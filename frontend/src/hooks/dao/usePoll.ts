import { PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import { CommissionFeeAtom, ContributorRewardAtom, PollDetailAtom, VoterRewardAtom } from "@/domains/atoms/PollDetailAtom";
import { Contribution } from "@/domains/Contribution";
import { Poll } from "@/types";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import artifact from "../../abi/Poll.sol/Poll.json";
import useMetaMask, {
    getContract,
    getContractWithSigner
} from "../web3/useMetaMask";
import useDaoHistory from "./useDaoHistory";

interface Props {
    daoId: string
    projectId: string
}

export default (props: Props) => {
    const [pollDetail, setPollDetail] = useAtom(PollDetailAtom)
    const [isAdmin, setIsAdmin] = useState(false)
    const { address } = useMetaMask();
    const [contributorReward] = useAtom(ContributorRewardAtom);
    const [voterReward] = useAtom(VoterRewardAtom);
    const [commissionFee] = useAtom(CommissionFeeAtom)

    const [contractAddress] = useAtom(PollContractAddress)

    const [contract, setContract] = useState<Poll | null>(null)
    const [contractWithSigner, setContractWithSigner] = useState<Poll | null>(null)

    const [startLoadCurrentMaxPoll, setStartLoadCurrentMaxPoll] = useState(false)
    useEffect(() => {
        if (contractAddress) {
            const contract = getContract(contractAddress, artifact.abi) as Poll
            setContract(contract)
            setContractWithSigner(getContractWithSigner(contractAddress, artifact.abi) as Poll)
        }
    }, [contractAddress])

    useEffect(() => {
        if (startLoadCurrentMaxPoll && contract) {
            _loadCurrentMaxPoll()
            setStartLoadCurrentMaxPoll(false)
        }
    }, [contract, startLoadCurrentMaxPoll])


    const _loadCurrentMaxPoll = async () => {
        if (!contract) return
        const _currentMaxPollId = await contract.functions.currentMaxPollId()
        const pollId = _currentMaxPollId[0].toNumber()
        _fetchPollDetail(pollId).then(res => {
            setPollDetail(res);
        })
    }

    const loadCurrentMaxPoll = () => {
        setStartLoadCurrentMaxPoll(true)
    }

    const checkIsAdmin = async () => {
        if (!contract) return
        contract.functions.hasRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("POLL_ADMIN_ROLE")), address).then((res) => {
            setIsAdmin(res[0]);
        });
    }

    const _fetchPollDetail = async (pollId: number) => {
        if (!contract) return
        const res = await contract.functions.getPollDetail(pollId);
        const pollDetail = res[0];
        const _pollDetail = {
            pollId: pollDetail.pollId.toNumber(),
            contributions: pollDetail.contributions.map((c) => {
                return {
                    contributor: c.contributor,
                    contributionText: c.contributionText,
                    evidences: c.evidences,
                    roles: c.roles,
                };
            }) as Contribution[],
            voters: pollDetail.voters,
            alreadyVoted: pollDetail.voters.includes(address),
            alreadyContributed: pollDetail.contributions.map((c) => c.contributor).includes(address),
            startTimeStamp: new Date(Number(pollDetail.startTimeStamp) * 1000),
            endTimeStamp: new Date(Number(pollDetail.endTimeStamp) * 1000),
            perspectives: pollDetail.perspectives
        }
        return _pollDetail
    }


    return {
        contractAddress,
        isAdmin,
        checkIsAdmin,
        pollDetail,
        loadCurrentMaxPoll,
        contributorReward,
        voterReward,
        commissionFee,
        vote: contractWithSigner?.functions.vote,
        settleCurrentPollAndCreateNewPoll: contractWithSigner?.functions.settleCurrentPollAndCreateNewPoll,
        candidateToPoll: contractWithSigner?.functions.candidateToCurrentPoll,
    };
};
