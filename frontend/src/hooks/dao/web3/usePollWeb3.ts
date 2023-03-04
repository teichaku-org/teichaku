import { Links } from "@/constants/Links"
import { NftContractAddress, PollContractAddress, TokenContractAddress } from "@/domains/atoms/DaoContractAddressAtom"
import {
  CommissionFeeAtom,
  ContributorRewardAtom,
  PollDetailAtom,
  VoterRewardAtom,
} from "@/domains/atoms/PollDetailAtom"
import { Contribution } from "@/domains/Contribution"
import { useLocale } from "@/i18n/useLocale"
import { Poll } from "@/types"
import { hideNotification, showNotification } from "@mantine/notifications"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import artifact from "../../../abi/Poll.sol/Poll.json"
import useMetaMask, { getContract, getContractWithSigner } from "../../web3/useMetaMask"
import { usePollInterface } from "../interface/usePollInterface"

const usePollWeb3: usePollInterface = (props: { daoId: string; projectId: string }) => {
  const { t } = useLocale()
  const router = useRouter()
  const [pollDetail, setPollDetail] = useAtom(PollDetailAtom)
  const [isAdmin, setIsAdmin] = useState(false)
  const { address } = useMetaMask(true)
  const [contributorReward] = useAtom(ContributorRewardAtom)
  const [voterReward] = useAtom(VoterRewardAtom)
  const [commissionFee] = useAtom(CommissionFeeAtom)

  const [contractAddress] = useAtom(PollContractAddress)

  const [nftAddress] = useAtom(NftContractAddress)
  const [daoTokenAddress] = useAtom(TokenContractAddress)

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
    _fetchPollDetail(pollId).then((res) => {
      setPollDetail(res)
    })
  }

  const loadCurrentMaxPoll = () => {
    setStartLoadCurrentMaxPoll(true)
  }

  const loadCurrentMaxPollId = async () => {
    const contract = getContract(contractAddress, artifact.abi) as Poll
    const currentMaxPollId = await contract.functions.currentMaxPollId()
    return currentMaxPollId[0].toNumber()
  }

  const checkIsAdmin = async () => {
    if (!contract) return
    contract.functions
      .hasRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("POLL_ADMIN_ROLE")), address)
      .then((res) => {
        setIsAdmin(res[0])
      })
  }

  const _fetchPollDetail = async (pollId: number) => {
    if (!contract) return
    const res = await contract.functions.getPollDetail(pollId)
    const pollDetail = res[0]
    const _pollDetail = {
      pollId: pollDetail.pollId.toNumber(),
      contributions: pollDetail.contributions.map((c) => {
        return {
          contributor: c.contributor,
          contributionText: c.contributionText,
          evidences: c.evidences,
          roles: c.roles,
        }
      }) as Contribution[],
      voters: pollDetail.voters,
      alreadyVoted: pollDetail.voters.includes(address),
      alreadyContributed: pollDetail.contributions.map((c) => c.contributor).includes(address),
      startTimeStamp: new Date(Number(pollDetail.startTimeStamp) * 1000),
      endTimeStamp: new Date(Number(pollDetail.endTimeStamp) * 1000),
      perspectives: pollDetail.perspectives,
    }
    return _pollDetail
  }

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    const tx = await contractWithSigner?.functions.candidateToCurrentPoll(contributionText, evidences, roles)
    showNotification({
      id: "candidate",
      title: t.Contribution.ContributionCard.Notification.Title,
      message: t.Contribution.ContributionCard.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("candidate")
    const commonPath = Links.getCommonPath(router)
    router.push(commonPath + "/poll")
  }

  const _setTokenAddress = async (_daoTokenAddress: string | null, _nftAddress: string | null) => {
    const tx = await contractWithSigner?.functions.setTokenAddress(
      _daoTokenAddress == null ? daoTokenAddress : _daoTokenAddress,
      _nftAddress == null ? nftAddress : _nftAddress
    )
    showNotification({
      id: "setTokenAddress",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("setTokenAddress")
    //reload
    window.location.reload()
  }

  const _setTokenDistribution = async (contributorReward: number, reviewerReward: number) => {
    const tx = await contractWithSigner?.functions.setAssignmentToken(
      ethers.utils.parseEther(String(contributorReward)),
      ethers.utils.parseEther(String(reviewerReward))
    )
    showNotification({
      id: "setTokenDistribution",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("setTokenDistribution")
    //reload
    window.location.reload()
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("points")
    localStorage.removeItem("comments")
  }

  const _setPerspectives = async (perspectives: string[]) => {
    const tx = await contractWithSigner?.functions.changePerspective(perspectives)
    showNotification({
      id: "setPerspectives",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("setPerspectives")
    //reload
    window.location.reload()
  }

  const _setStartTime = async (pollId: number, startTimeStamp: number) => {
    const tx = await contractWithSigner?.functions.setStartTimeStamp(pollId, startTimeStamp)
    showNotification({
      id: "setStartTimeStamp",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("setStartTimeStamp")
    //reload
    window.location.reload()
  }

  const _setDuration = async (pollId: number, durationDays: number) => {
    const tx = await contractWithSigner?.functions.setVotingDuration(pollId, durationDays * 24 * 60 * 60)
    showNotification({
      id: "setDuration",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("setDuration")
    //reload
    window.location.reload()
  }

  const _vote = async (pollId: number, candidates: string[], points: number[][], comments: string[]) => {
    const tx = await contractWithSigner?.functions.vote(pollId, candidates, points, comments)
    showNotification({
      id: "vote",
      title: t.Poll.PollSystem.Notification.Title,
      message: t.Poll.PollSystem.Notification.Message,
      loading: true,
      autoClose: false,
    })

    await tx?.wait()
    clearLocalStorage()
    hideNotification("vote")
    //reload
    window.location.reload()
  }

  const settleCurrentPollAndCreateNewPoll = async () => {
    const tx = await contractWithSigner?.functions.settleCurrentPollAndCreateNewPoll()
    showNotification({
      id: "settle",
      title: t.Poll.PollSystem.Settle.Title,
      message: t.Poll.PollSystem.Settle.Message,
      loading: true,
      autoClose: false,
    })
    await tx?.wait()
    hideNotification("settle")
    const commonPath = Links.getCommonPath(router)
    router.push(commonPath + "/history")
  }

  return {
    contractAddress,
    isAdmin,
    checkIsAdmin,
    pollDetail,
    loadCurrentMaxPoll,
    loadCurrentMaxPollId,
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

export default usePollWeb3
