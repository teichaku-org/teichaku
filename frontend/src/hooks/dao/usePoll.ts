import { PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import { PollDetailAtom } from "@/domains/atoms/PollDetailAtom";
import { Candidate } from "@/domains/Candidate";
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

    const { load } = useDaoHistory({ daoId: props.daoId, projectId: props.projectId })
    const [pollDetail, setPollDetail] = useAtom(PollDetailAtom)
    const [isAdmin, setIsAdmin] = useState(false)
    const { address } = useMetaMask();
    //TODO: ブロックチェーンから値を取る
    const [contributorReward, setContributorReward] = useState<number>(7000);
    const [voterReward, setVoterReward] = useState<number>(3000);
    const [tokenContractAddress, setTokenContractAddress] = useAtom(TokenContractAddress)
    const [isEligibleToVote, setIsEligibleToVote] = useState(true);

    const [contractAddress] = useAtom(PollContractAddress)

    const [contract, setContract] = useState<Poll | null>(null)
    const [contractWithSigner, setContractWithSigner] = useState<Poll | null>(null)

    const [startLoadCurrentMaxPoll, setStartLoadCurrentMaxPoll] = useState(false)
    useEffect(() => {
        if (contractAddress) {
            const contract = getContract(contractAddress, artifact.abi) as Poll
            setContract(contract)
            setContractWithSigner(getContractWithSigner(contractAddress, artifact.abi) as Poll)
            contract.functions.daoTokenAddress().then((address) => {
                setTokenContractAddress(address[0])
            })
        } else {
            load()
        }
    }, [contractAddress])

    useEffect(() => {
        if (startLoadCurrentMaxPoll) {
            _loadCurrentMaxPoll()
            setStartLoadCurrentMaxPoll(false)
        }
    }, [contract, startLoadCurrentMaxPoll])


    const _loadCurrentMaxPoll = async () => {
        if (!contract) return
        const currentMaxPollId = await contract.functions.currentMaxPollId()
        const _pollDetail = await fetchPollDetail(currentMaxPollId[0].toNumber());
        setPollDetail(_pollDetail);
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


    const fetchPollDetail = async (pollId: number) => {
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
            }) as Candidate[],
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
        fetchPollDetail,
        contributorReward,
        voterReward,
        vote: contractWithSigner?.functions.vote,
        settleCurrentPollAndCreateNewPoll: contractWithSigner?.functions.settleCurrentPollAndCreateNewPoll,
        candidateToPoll: contractWithSigner?.functions.candidateToCurrentPoll,
    };
};
