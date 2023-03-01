import { PollEndInfo } from "@/components/poll/PollEndInfo"
import { PollSystem } from "@/components/poll/PollSystem"
import { Links } from "@/constants/Links"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import useDaoToken from "@/hooks/dao/useDaoToken"
import usePoll from "@/hooks/dao/usePoll"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { checkWeb3 } from "@/utils/checkWeb3"
import { Center, Container, Loader, Text, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

type props = {
  isWeb3: boolean
}

const Poll = ({ isWeb3 }: props) => {
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)
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
  } = usePoll(dao, isWeb3)

  const { tokenSymbol } = useDaoToken(dao, isWeb3)
  const { treasuryBalance } = useDaoToken(dao, isWeb3)
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
    if (isWeb3 && isTokenShort) {
      const commonPath = Links.getCommonPath(router)
      router.push(`/${commonPath}/settings/send-token`)
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

export async function getServerSideProps(context: {
  resolvedUrl: string
  query: { daoId: string; type: "check" | "web2" | "web3" }
}) {
  const webType = context.query.type
  const daoId = context.query.daoId
  const isWeb3 = await checkWeb3(webType, daoId)
  if (webType === "check") {
    return {
      redirect: {
        permanent: false,
        destination: context.resolvedUrl.replace("check", isWeb3 ? "web3" : "web2"),
      },
    }
  }
  return {
    props: {
      isWeb3,
    },
  }
}
export default Poll
