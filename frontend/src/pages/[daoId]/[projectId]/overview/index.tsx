import { OrganizationCard } from "@/components/overview/OrganizationCard"
import { TokenInfoCard } from "@/components/overview/TokenInfoCard"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import { Grid } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Overview = () => {
    useDaoExistCheck()
    useDaoLoad()

    const router = useRouter()
    const { daoId, projectId } = router.query
    const dao = { daoId: daoId as string, projectId: projectId as string }
    const { daoInfo, load, daoHistory, assessments } = useDaoHistory(dao);
    const contributionCount = daoHistory?.length || 0;
    const contributorCount = daoHistory ? new Set(daoHistory.map((history) => history.contributor)).size : 0;
    const voterCount = assessments ? new Set(assessments.map((history) => history.voter)).size : 0;

    //const { tokenTotalSupply, tokenSymbol, tokenName, contractAddress } = useDaoToken(dao)
    const { tokenTotalSupply, tokenSymbol, tokenName, contractAddress } = { tokenTotalSupply: 100, tokenSymbol: "DAI", tokenName: "DAI", contractAddress: "0x123" }
    //const { contributorReward, voterReward } = usePoll(dao)
    const { contributorReward, voterReward } = { contributorReward: 10, voterReward: 10 }

    useEffect(() => {
        if (daoId && projectId) {
            load();
        }
    }, [daoId, projectId]);

    if (!daoInfo) return <div>Loading</div>
    return <div>
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
                    tokenSymbol={tokenSymbol}
                    tokenName={tokenName}
                    contractAddress={contractAddress}
                    contributorReward={contributorReward}
                    voterReward={voterReward}
                />
            </Grid.Col>
        </Grid>




    </div>
}
export default Overview