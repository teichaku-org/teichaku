import useDaoHistory from "@/hooks/dao/useDaoHistory"
import usePoll from "@/hooks/dao/usePoll"
import useMetaMask from "@/hooks/web3/useMetaMask"
import { getSingleAssessment } from "@/utils/analysis/getSingleAssessment"
import { Button, Center, Container, Paper, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AssessmentRadar } from "../graphs/AssessmentRadar"
import { Comments } from "./Comments"
import { EarnedCoin } from "./EarnedCoin"
import { Evidences } from "./Evidences"

interface Props {
    contributor: string
    pollId: number

}
export const SingleAssessment = (props: Props) => {
    const router = useRouter()
    const { daoId, projectId } = router.query
    const { pollDetail, loadCurrentMaxPoll } = usePoll({ daoId: daoId as string, projectId: projectId as string })
    const { address } = useMetaMask()
    const { daoHistory, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string })

    const perspectives = pollDetail?.perspectives || []
    useEffect(() => {
        //TODO: pollIdごとに異なるperspectivesを取得したい
        loadCurrentMaxPoll()
    }, [])

    const contribution = daoHistory.find((item) => item.contributor === props.contributor && item.pollId === props.pollId)
    const targetAssessments = assessments.filter((item) => item.contributor === props.contributor && item.pollId === props.pollId)
    const comments = targetAssessments.map((item) => {
        return {
            comment: item.comment,
            author: item.voter,
            timestamp: contribution?.timestamp || new Date()
        }
    }).sort((a, b) => {
        return b.comment.length - a.comment.length
    })
    const evidences = contribution?.evidences
    const data = getSingleAssessment(assessments, perspectives, props.contributor, props.pollId)
    const isYourContribution = props.contributor === address
    return <div >

        <Text mt="lg" mb="xs" color="dimmed">Earned tokens</Text>

        <Container>
            <EarnedCoin reward={String(Math.round(contribution?.reward || 0))} />
        </Container>

        <Text mt="lg" mb="xs" color="dimmed">Assessments</Text>
        <Container style={{ height: 330, width: 330 }}>
            <AssessmentRadar data={data} />
        </Container>

        {/* 貢献内容 */}
        <Text mt="lg" mb="xs" color="dimmed">Contribution</Text>
        <Paper p="md" withBorder mb="sm">
            <Text size="md" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                {contribution?.contributionText}
            </Text>
        </Paper>

        {/* エビデンス */}
        <Text mt="lg" mb="xs" color="dimmed">Evidences</Text>
        <Evidences evidences={evidences || []} />

        {/* 投票者 & コメント */}
        <Text mt="lg" mb="xs" color="dimmed">Reviewers and Comments</Text>
        <Comments comments={comments} />

        {/* 自分のだったらNFT化 */}
        <Center>
            <Button size="lg" disabled={!isYourContribution} variant="gradient" gradient={{ from: "blue", to: "grape" }}>
                Mint NFT
            </Button>
        </Center>

        <div style={{ height: 300 }} />
    </div>
}