import { OrganizationCard } from "@/components/overview/OrganizationCard"
import { TokenInfoCard } from "@/components/overview/TokenInfoCard"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import useDaoToken from "@/hooks/dao/useDaoToken"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { checkWeb3 } from "@/utils/checkWeb3"
import { Center, Grid, Loader, Text, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

type props = {
  isWeb3: boolean
}

const Overview = ({ isWeb3 }: props) => {
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)

  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  const dao = { daoId: daoId as string, projectId: projectId as string }
  const { daoInfo, load, daoHistory, assessments } = useDaoHistory(dao, isWeb3)
  const contributionCount = daoHistory?.length || 0
  const contributorCount = daoHistory ? new Set(daoHistory.map((history) => history.contributor)).size : 0
  const voterCount = assessments ? new Set(assessments.map((history) => history.voter)).size : 0

  const { tokenTotalSupply, tokenSymbol, tokenName, contractAddress, treasuryBalance } = useDaoToken(dao, isWeb3)
  const { contributorReward, voterReward, commissionFee } = usePoll(dao, isWeb3)

  useEffect(() => {
    if (daoId && projectId) {
      load()
    }
  }, [daoId, projectId])

  if (!daoInfo)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )
  return (
    <div>
      <Center>
        <Title size="h1">{t.Overview.Title}</Title>
      </Center>

      <Center mb="md">
        <Text color="dimmed">{t.Overview.SubTitle}</Text>
      </Center>

      <Grid>
        <Grid.Col sm={12} md={6}>
          <OrganizationCard
            daoId={daoId as string}
            avatar={daoInfo.logo || ""}
            name={daoInfo.name || ""}
            description={daoInfo.description || ""}
            contributionCount={contributionCount || 0}
            contributorCount={contributorCount || 0}
            voterCount={voterCount || 0}
          />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <TokenInfoCard
            tokenTotalSupply={tokenTotalSupply}
            treasuryBalance={treasuryBalance}
            tokenSymbol={tokenSymbol}
            tokenName={tokenName}
            contractAddress={contractAddress}
            contributorReward={contributorReward}
            commissionFee={commissionFee}
            voterReward={voterReward}
          />
        </Grid.Col>
      </Grid>
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
export default Overview
