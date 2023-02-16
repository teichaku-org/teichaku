import { usePollInterface } from "../interface/usePollInterface";

const usePollWeb2: usePollInterface = (props: {
    daoId: string
    projectId: string
}) => {

    const contractAddress = ""
    const isAdmin = false
    const pollDetail = undefined
    const contributorReward = 0
    const voterReward = 0
    const commissionFee = 0

    const checkIsAdmin = async () => {
    }

    const _loadCurrentMaxPoll = async () => {
    }

    const loadCurrentMaxPoll = () => {
    }

    const _vote = async (pollId: number, candidates: string[], points: number[][], comments: string[]) => {
    }

    const settleCurrentPollAndCreateNewPoll = async () => {
    }

    const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    }

    const _setTokenAddress = async (_daoTokenAddress: string | null, _nftAddress: string | null) => {
    }

    const _setStartTime = async (pollId: number, startTimeStamp: number) => {
    }

    const _setDuration = async (pollId: number, durationDays: number) => {
    }

    const _setPerspectives = async (perspectives: string[]) => {
    }

    const _setTokenDistribution = async (contributorReward: number, voterReward: number, commissionFee: number) => {
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
        vote: _vote,
        settleCurrentPollAndCreateNewPoll,
        candidateToPoll: _candidateToPoll,
        setTokenAddress: _setTokenAddress,
        setStartTime: _setStartTime,
        setDuration: _setDuration,
        setPerspectives: _setPerspectives,
        setTokenDistribution: _setTokenDistribution,
    }
}

export default usePollWeb2