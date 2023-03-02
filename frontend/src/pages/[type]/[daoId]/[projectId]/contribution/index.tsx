import { ContributionCard } from "@/components/contribution/ContributionCard"
import { PollEndInfo } from "@/components/poll/PollEndInfo"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { checkWeb3 } from "@/utils/checkWeb3"
import { Center, Container, Loader, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Contribution = (props: { isWeb3: boolean }) => {
  useDaoExistCheck(props.isWeb3)
  useDaoLoad(props.isWeb3)
  const router = useRouter()
  const { t } = useLocale()
  const { daoId, projectId } = router.query
  const { candidateToPoll, pollDetail, loadCurrentMaxPoll, contractAddress } = usePoll(
    {
      daoId: daoId as string,
      projectId: projectId as string,
    },
    props.isWeb3
  )

  useEffect(() => {
    loadCurrentMaxPoll()
  }, [contractAddress])

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    if (!candidateToPoll) return
    await candidateToPoll(contributionText, evidences, roles)
  }

  if (!pollDetail)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )
  return (
    <Container>
      <Center m="md">
        <Title size="h1">{t.Contribution.Title}</Title>
      </Center>
      <PollEndInfo startDate={pollDetail.startTimeStamp} endDate={pollDetail.endTimeStamp} />
      <div style={{ height: 10 }} />
      <ContributionCard candidateToPoll={_candidateToPoll} isWeb3={props.isWeb3} />
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
export default Contribution
