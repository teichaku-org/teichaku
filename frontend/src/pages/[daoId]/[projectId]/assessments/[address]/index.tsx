import type { NextPage } from "next"

import AssessmentTab from "@/components/assessment/AssessmentTabs"
import NodataMessage from "@/components/common/NodataMsg"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import { shortenAddress } from "@/utils/shortenAddress"
import { Center, Loader, Title } from "@mantine/core"
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
  const { daoId, projectId, address } = router.query
  const { daoHistory, load, assessments } = useDaoHistory(
    { daoId: daoId as string, projectId: projectId as string },
    isWeb3
  )
  useEffect(() => {
    if (daoId && projectId) {
      load()
    }
  }, [daoId, projectId])

  if (!daoHistory && !assessments)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )
  if (daoHistory.length === 0) return <NodataMessage />

  return (
    <div>
      <Center>
        <Title size="h1">{shortenAddress(address as string)} Assessments</Title>
      </Center>
      <AssessmentTab daoHistory={daoHistory} address={address as string} />
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
