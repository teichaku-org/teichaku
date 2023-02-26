import { ContributionCard } from "@/components/contribution/ContributionCard"
import { PollEndInfo } from "@/components/poll/PollEndInfo"
import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { Center, Container, Loader, Title } from "@mantine/core"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect } from "react"

type props = {
  isWeb3: boolean
}

const Contribution = ({ isWeb3 }: props) => {
  const [_, setIsWeb3Flag] = useAtom(Web3FlagAtom)
  useLayoutEffect(() => {
    setIsWeb3Flag(isWeb3)
  }, [isWeb3])

  useDaoExistCheck()
  useDaoLoad()
  const router = useRouter()
  const { t } = useLocale()
  const { daoId, projectId } = router.query
  const { candidateToPoll, pollDetail, loadCurrentMaxPoll, contractAddress } = usePoll({
    daoId: daoId as string,
    projectId: projectId as string,
  })

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
  return { props: { isWeb3: res?.data.isWeb3 || true } }
}

export default Contribution
