import useDaoHistory from "@/hooks/dao/useDaoHistory"
import usePoll from "@/hooks/dao/usePoll"
import { getSingleAssessment } from "@/utils/analysis/getSingleAssessment"
import { Center, Container, Paper, Text } from "@mantine/core"
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
    const { fetchPollDetail } = usePoll()
    const { daoHistory } = useDaoHistory()
    const { assessments } = useDaoHistory()
    const [perspectives, setPerspectives] = useState<string[]>([])

    const contribution = daoHistory.find((item) => item.contributor === props.contributor && item.pollId === props.pollId)
    const targetAssessments = assessments.filter((item) => item.contributor === props.contributor && item.pollId === props.pollId)
    const comments = targetAssessments.map((item) => {
        return {
            comment: item.comment,
            author: item.voter,
            timestamp: contribution?.timestamp || new Date()
        }
    })
    const evidences = contribution?.evidences
    useEffect(() => {
        fetchPollDetail(props.pollId).then(res => {
            setPerspectives(res.perspectives)
        })
    }, [])


    const data = getSingleAssessment(assessments, perspectives, props.contributor, props.pollId)
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

        {/* コメント */}
        <Text mt="lg" mb="xs" color="dimmed">Comments</Text>
        <Comments comments={comments} />

        {/* 自分のだったらNFT化 */}
        <div style={{ height: 300 }} />
    </div>
}