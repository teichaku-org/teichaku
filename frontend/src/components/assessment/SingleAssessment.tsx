import { Assessment } from "@/domains/Assessment"
import { getSingleAssessment } from "@/utils/analysis/getSingleAssessment"
import { AssessmentRadar } from "../graphs/AssessmentRadar"

interface Props {
    assessments: Assessment[]
    perspectives: string[]
    contributor: string
    pollId: number

}
export const SingleAssessment = (props: Props) => {
    const data = getSingleAssessment(props.assessments, props.perspectives, props.contributor, props.pollId)
    return <div>
        {/* TODO: heightとwidthをウィンドウサイズから設定 */}
        <div style={{ height: 400, width: 400 }}>
            <AssessmentRadar data={data} />
        </div>
    </div>
}