import useDaoHistory from "@/hooks/dao/useDaoHistory"
import usePoll from "@/hooks/dao/usePoll"
import { getSingleAssessment } from "@/utils/analysis/getSingleAssessment"
import { useEffect, useState } from "react"
import { AssessmentRadar } from "../graphs/AssessmentRadar"

interface Props {
    contributor: string
    pollId: number

}
export const SingleAssessment = (props: Props) => {
    const { fetchPollDetail } = usePoll()
    const { assessments } = useDaoHistory()
    const [perspectives, setPerspectives] = useState<string[]>([])

    useEffect(() => {
        fetchPollDetail(props.pollId).then(res => {
            setPerspectives(res.perspectives)
        })
    }, [])

    const data = getSingleAssessment(assessments, perspectives, props.contributor, props.pollId)
    return <div>
        {/* TODO: heightとwidthをウィンドウサイズから設定 */}
        <div style={{ height: 400, width: 400 }}>
            <AssessmentRadar data={data} />
        </div>
    </div>
}