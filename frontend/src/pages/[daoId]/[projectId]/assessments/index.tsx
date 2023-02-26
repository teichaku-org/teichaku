import type { NextPage } from "next"

import AssessmentTab from "@/components/assessment/AssessmentTabs"
import NodataMessage from "@/components/common/NodataMsg"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { useLocale } from "@/i18n/useLocale"
import { Center, Container, Loader, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { APIClient } from "@/types/APIClient"

type props = {
  isWeb3: boolean
}

const Assessment = ({ isWeb3 }: props) => {
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)
  const router = useRouter()
  const { t } = useLocale()
  const { daoId, projectId } = router.query
  const { daoHistory, load, assessments } = useDaoHistory(
    { daoId: daoId as string, projectId: projectId as string },
    isWeb3
  )
  const { address } = useWeb3Auth()
  useEffect(() => {
    if (daoId && projectId) {
      load()
    }
  }, [daoId, projectId])

  if (!daoHistory && !assessments)
    return (
      <Container>
        <Loader size="lg" variant="dots" />
      </Container>
    )
  if (daoHistory.length === 0) return <NodataMessage />

  return (
    <div>
      <Center>
        <Title size="h1">{t.Assessment.Title}</Title>
      </Center>
      <AssessmentTab daoHistory={daoHistory} address={address} />
    </div>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  const apiClient = new APIClient()
  let isWeb3: boolean = false
  const res = await apiClient.post("/getIsWeb3", { daoId: context.query.daoId })
  if (res) {
    isWeb3 = res.data
  }
  // Pass data to the page via props
  return { props: { isWeb3 } }
}

export default Assessment
