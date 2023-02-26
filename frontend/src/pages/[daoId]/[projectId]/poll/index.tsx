import { PollEndInfo } from "@/components/poll/PollEndInfo"
import { PollSystem } from "@/components/poll/PollSystem"
import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import useDaoToken from "@/hooks/dao/useDaoToken"
import usePoll from "@/hooks/dao/usePoll"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { Center, Container, Loader, Text, Title } from "@mantine/core"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect } from "react"

type props = {
  isWeb3: boolean
}

const Poll = ({ isWeb3 }: props) => {
  const [_, setIsWeb3Flag] = useAtom(Web3FlagAtom)
  useLayoutEffect(() => {
    setIsWeb3Flag(isWeb3)
  }, [isWeb3])

  useDaoExistCheck()
  useDaoLoad()
  const { address } = useWeb3Auth()
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  const dao = { daoId: daoId as string, projectId: projectId as string }
  const {
    isAdmin,
    checkIsAdmin,
    pollDetail,
    contractAddress,
    contributorReward,
    vote,
    candidateToPoll,
    loadCurrentMaxPoll,
    settleCurrentPollAndCreateNewPoll,
    voterReward,
    commissionFee,
  } = usePoll(dao)

  const { tokenSymbol } = useDaoToken(dao)
  const { treasuryBalance } = useDaoToken(dao)
  const isTokenShort = treasuryBalance < contributorReward + voterReward + commissionFee

  useEffect(() => {
    loadCurrentMaxPoll()
  }, [contractAddress])

  useEffect(() => {
    if (address) checkIsAdmin()
  }, [address])

  if (!pollDetail)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )
  const voters = pollDetail.voters
  const candidates = pollDetail.contributions
  const incentiveForVoters = Math.round(voterReward / (voters.length + 1))

  const _vote = async (points: number[][], comments: string[]) => {
    if (!vote) return
    const candidates = pollDetail.contributions.map((c) => c.contributor)
    await vote(pollDetail.pollId, candidates, points, comments)
  }

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    if (!candidateToPoll) return
    await candidateToPoll(contributionText, evidences, roles)
  }

  const _settle = async () => {
    // トークンがない場合はトークン振込ページへ
    if (isTokenShort) {
      router.push(`/${daoId}/${projectId}/settings/send-token`)
      return
    }
    if (voters.length === 0) {
      window.confirm(t.Poll.ConfirmNoVoter)
    }
    await settleCurrentPollAndCreateNewPoll()
  }

  if (!pollDetail)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )
  return (
    <Container>
      <Center>
        <Title size="h1">{t.Poll.Title}</Title>
      </Center>

      <PollEndInfo startDate={pollDetail.startTimeStamp} endDate={pollDetail.endTimeStamp} settle={_settle} />
      <Text>
        {t.Poll.CurrentReviewerIncentive}{" "}
        <b>
          {incentiveForVoters} {tokenSymbol}
        </b>
      </Text>
      <div style={{ height: 10 }} />
      <PollSystem
        candidates={candidates}
        alreadyVoted={pollDetail.alreadyVoted}
        contributorReward={contributorReward}
        vote={_vote}
        perspectives={pollDetail.perspectives}
        candidateToPoll={_candidateToPoll}
        isAdmin={isAdmin}
        settle={_settle}
        tokenSymbol={tokenSymbol}
        endDate={pollDetail.endTimeStamp}
      />
    </Container>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  const apiClient = new APIClient()
  const res = await apiClient.post("/getIsWeb3", { daoId: context.query.daoId })
  return { props: { isWeb3: res?.data.isWeb3 || true } }
}
export default Poll
