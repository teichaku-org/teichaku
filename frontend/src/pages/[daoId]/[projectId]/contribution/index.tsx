import { ContributionCard } from "@/components/contribution/ContributionCard"
import { PollEndInfo } from "@/components/poll/PollEndInfo"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/types/APIClient"
import { Center, Container, Loader, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

type props = {
  isWeb3: boolean
}

const Contribution = ({ isWeb3 }: props) => {
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)
  const router = useRouter()
  const { t } = useLocale()
  const { daoId, projectId } = router.query
  const { candidateToPoll, pollDetail, loadCurrentMaxPoll, contractAddress } = usePoll(
    {
      daoId: daoId as string,
      projectId: projectId as string,
    },
    isWeb3
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
      <ContributionCard candidateToPoll={_candidateToPoll} />
    </Container>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  const apiClient = new APIClient()
  const res = await apiClient.post("/getIsWeb3", { daoId: context.query.daoId })
  return { props: { isWeb3: res ? res.data.isWeb3 : true } }
}

export default Contribution
