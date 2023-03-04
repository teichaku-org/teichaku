import { hideNotification, showNotification } from "@mantine/notifications"
import { usePollInterface } from "../interface/usePollInterface"
import { useRouter } from "next/router"
import { Links } from "@/constants/Links"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { useAtom } from "jotai"
import { ContributorRewardAtom, PollDetailAtom, VoterRewardAtom } from "@/domains/atoms/PollDetailAtom"
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
  const [contributorReward] = useAtom(ContributorRewardAtom)
  const [voterReward] = useAtom(VoterRewardAtom)
  const commissionFee = 0
  const apiClient = new APIClient()
  const { getUserIdToken, login } = useWeb3Auth()

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
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
      return
    }
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
      return res.data.currentMaxPollId
    }
  }

  const _vote = async (pollId: number, candidates: string[], points: number[][], comments: string[]) => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    showNotification({
      id: "vote",
      title: t.Poll.PollSystem.NotificationWeb2.Title,
      message: t.Poll.PollSystem.NotificationWeb2.Message,
      loading: true,
      autoClose: false,
    })

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
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    showNotification({
      id: "settle",
      title: t.Poll.PollSystem.SettleWeb2.Title,
      message: t.Poll.PollSystem.SettleWeb2.Message,
      loading: true,
      autoClose: false,
    })
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
    let address = sessionStorage.getItem("address")
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
        alreadyVoted: res.data.voters.includes(address),
        alreadyContributed: res.data.contributions.map((c: Contribution) => c.contributor).includes(address),
        startTimeStamp: new Date(res.data.startTime),
        endTimeStamp: new Date(res.data.endTime),
        perspectives: res.data.perspectives,
      }
    }
    return _pollDetail
  }

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    showNotification({
      id: "candidate",
      title: t.Contribution.ContributionCard.NotificationWeb2.Title,
      message: t.Contribution.ContributionCard.NotificationWeb2.Message,
      loading: true,
      autoClose: false,
    })
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
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
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

    showNotification({
      id: "setStartTimeStamp",
      title: t.Settings.NotificationWeb2.Title,
      message: t.Settings.NotificationWeb2.Message,
      loading: false,
      autoClose: true,
    })
    //reload
    // window.location.reload()
  }

  const _setDuration = async (pollId: number, durationDays: number) => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
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
    showNotification({
      id: "setDuration",
      title: t.Settings.NotificationWeb2.Title,
      message: t.Settings.NotificationWeb2.Message,
      loading: false,
      autoClose: true,
    })
    //reload
    // window.location.reload()
  }

  const _setPerspectives = async (perspectives: string[]) => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
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

    showNotification({
      id: "setPerspectives",
      title: t.Settings.NotificationWeb2.Title,
      message: t.Settings.NotificationWeb2.Message,
      loading: false,
      autoClose: true,
    })
    //reload
    // window.location.reload()
  }

  const _setTokenDistribution = async (contributorReward: number, reviewerReward: number) => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
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

    showNotification({
      id: "setTokenDistribution",
      title: t.Settings.NotificationWeb2.Title,
      message: t.Settings.NotificationWeb2.Message,
      loading: false,
      autoClose: true,
    })
    //reload
    // window.location.reload()
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
