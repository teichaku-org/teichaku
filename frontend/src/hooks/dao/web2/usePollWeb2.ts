import { hideNotification, showNotification } from "@mantine/notifications"
import { usePollInterface } from "../interface/usePollInterface"
import { useRouter } from "next/router"
import { Links } from "@/constants/Links"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { useAtom } from "jotai"
import { PollDetailAtom } from "@/domains/atoms/PollDetailAtom"
import { Contribution } from "@/domains/Contribution"
import { PollDetail } from "@/domains/PollDetail"
import { useEffect } from "react"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"

const usePollWeb2: usePollInterface = (props: { daoId: string; projectId: string }) => {
  const router = useRouter()
  const { t } = useLocale()
  const contractAddress = ""
  const isAdmin = false
  const [pollDetail, setPollDetail] = useAtom(PollDetailAtom)
  const contributorReward = 0
  const voterReward = 0
  const commissionFee = 0
  const apiClient = new APIClient()
  const { getUserIdToken } = useWeb3Auth()

  const checkIsAdmin = async () => {}

  const clearLocalStorage = () => {
    localStorage.removeItem("points")
    localStorage.removeItem("comments")
  }

  useEffect(() => {
    _loadCurrentMaxPoll()
  }, [])

  const _loadCurrentMaxPoll = async () => {
    const idToken = await getUserIdToken()
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    const res = await apiClient.post(
      "/currentMaxPollId",
      {
        daoId: props.daoId,
        projectId: props.projectId,
      },
      headers
    )
    if (res) {
      const pollId = res.data.currentMaxPollId
      _fetchPollDetail(pollId).then((res) => {
        if (res) {
          setPollDetail(res)
        }
      })
    }
  }

  const loadCurrentMaxPoll = () => {}

  const loadCurrentMaxPollId = async () => {
    return 1
  }

  const _vote = async (pollId: number, candidates: string[], points: number[][], comments: string[]) => {
    showNotification({
      id: "vote",
      title: t.Poll.PollSystem.Notification.Title,
      message: t.Poll.PollSystem.Notification.Message,
      loading: true,
      autoClose: false,
    })
    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    await apiClient.post(
      "/vote",
      {
        daoId: props.daoId,
        projectId: props.projectId,
        pollId: pollId,
        candidates: candidates,
        points: points,
        comments: comments,
      },
      headers
    )

    clearLocalStorage()
    hideNotification("vote")
    //reload
    window.location.reload()
  }

  const settleCurrentPollAndCreateNewPoll = async () => {
    showNotification({
      id: "settle",
      title: t.Poll.PollSystem.Settle.Title,
      message: t.Poll.PollSystem.Settle.Message,
      loading: true,
      autoClose: false,
    })
    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    await apiClient.post(
      "/settleCurrentPollAndCreateNewPoll",
      {
        daoId: props.daoId,
        projectId: props.projectId,
      },
      headers
    )
    hideNotification("settle")
    const commonPath = Links.getCommonPath(router)
    router.push(commonPath + "/history")
  }

  const _fetchPollDetail = async (pollId: number): Promise<PollDetail | null> => {
    const idToken = await getUserIdToken()
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    const res = await apiClient.post(
      "/getPollDetail",
      {
        daoId: props.daoId,
        projectId: props.projectId,
        pollId: pollId,
      },
      headers
    )
    let _pollDetail: PollDetail | null = null

    if (res) {
      _pollDetail = {
        pollId: res.data.pollId,
        contributions: res.data.contributions,
        voters: res.data.voters,
        alreadyVoted: res.data.voters.includes("TestUser"),
        alreadyContributed: res.data.contributions.map((c: Contribution) => c.contributor).includes("TestUser"),
        startTimeStamp: new Date(res.data.startTime),
        endTimeStamp: new Date(res.data.endTime),
        perspectives: res.data.perspectives,
      }
    }
    return _pollDetail
  }

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    showNotification({
      id: "candidate",
      title: t.Contribution.ContributionCard.Notification.Title,
      message: t.Contribution.ContributionCard.Notification.Message,
      loading: true,
      autoClose: false,
    })
    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    await apiClient.post(
      "/candidateToCurrentPoll",
      {
        daoId: props.daoId,
        contributionText: contributionText,
        evidences: evidences,
        roles: roles,
        contributor: "myUserId",
        pollId: props.daoId,
      },
      headers
    )

    hideNotification("candidate")
    const commonPath = Links.getCommonPath(router)
    router.push(commonPath + "/poll")
  }

  const _setTokenAddress = async (_daoTokenAddress: string | null, _nftAddress: string | null) => {}

  const _setStartTime = async (pollId: number, startTimeStamp: number) => {
    showNotification({
      id: "setStartTimeStamp",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    await apiClient.post(
      "/setStartTimeStamp",
      {
        daoId: props.daoId,
        projectId: props.projectId,
        pollId: pollId,
        startTimeStamp: startTimeStamp * 1000,
      },
      headers
    )

    hideNotification("setStartTimeStamp")
    //reload
    window.location.reload()
  }

  const _setDuration = async (pollId: number, durationDays: number) => {
    showNotification({
      id: "setDuration",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })

    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    await apiClient.post(
      "/setVotingDuration",
      {
        daoId: props.daoId,
        projectId: props.projectId,
        pollId: pollId,
        durationDays: durationDays * 24 * 60 * 60 * 1000,
      },
      headers
    )
    hideNotification("setDuration")
    //reload
    window.location.reload()
  }

  const _setPerspectives = async (perspectives: string[]) => {
    showNotification({
      id: "setPerspectives",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })
    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    await apiClient.post(
      "/changePerspective",
      {
        daoId: props.daoId,
        projectId: props.projectId,
        perspectiveTexts: perspectives,
      },
      headers
    )
    hideNotification("setPerspectives")
    //reload
    window.location.reload()
  }

  const _setTokenDistribution = async (contributorReward: number, reviewerReward: number) => {
    showNotification({
      id: "setTokenDistribution",
      title: t.Settings.Notification.Title,
      message: t.Settings.Notification.Message,
      loading: true,
      autoClose: false,
    })

    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    await apiClient.post(
      "/setAssignmentToken",
      {
        daoId: props.daoId,
        projectId: props.projectId,
        contributorReward: contributorReward,
        reviewerReward: reviewerReward,
      },
      headers
    )

    hideNotification("setTokenDistribution")
    //reload
    window.location.reload()
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

export default usePollWeb2
