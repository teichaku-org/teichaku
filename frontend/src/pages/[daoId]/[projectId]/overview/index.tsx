import { OrganizationCard } from "@/components/overview/OrganizationCard"
import { TokenInfoCard } from "@/components/overview/TokenInfoCard"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { Grid, SimpleGrid } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Overview = () => {
    useDaoExistCheck()
    const router = useRouter()
    const { daoId, projectId } = router.query
    const { daoInfo, load, daoHistory, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
    const contributionCount = daoHistory.length
    const contributorCount = new Set(daoHistory.map((history) => history.contributor)).size
    const voterCount = new Set(assessments.map((history) => history.voter)).size
    useEffect(() => {
        if (daoId && projectId) {
            load();
        }
    }, [daoId, projectId]);

    return <div>
        <Grid>
            <Grid.Col sm={12} md={6}>
                <OrganizationCard
                    daoId={daoId as string}
                    avatar={daoInfo?.logo || ""}
                    name={daoInfo?.name || ""}
                    description={daoInfo?.description || ""}
                    contributionCount={contributionCount || 0}
                    contributorCount={contributorCount || 0}
                    voterCount={voterCount || 0}
                />
            </Grid.Col>
            <Grid.Col sm={12} md={6}>
                <TokenInfoCard />
            </Grid.Col>
        </Grid>




    </div>
}
export default Overview