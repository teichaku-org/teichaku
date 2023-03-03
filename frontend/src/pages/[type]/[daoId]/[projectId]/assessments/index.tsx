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
import { APIClient } from "@/utils/APIClient"
import { checkWeb3 } from "@/utils/checkWeb3"
import NetworkCheck from "@/components/web3/common/NetworkCheck"

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
        <NetworkCheck isWeb3={isWeb3} />
        <Loader size="lg" variant="dots" />
      </Container>
    )
  if (daoHistory.length === 0) return <NodataMessage />

  return (
    <div>
      <Center>
        <Title size="h1">{t.Assessment.Title}</Title>
      </Center>
      <AssessmentTab daoHistory={daoHistory} address={address} isWeb3={isWeb3} />
    </div>
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

export default Assessment
