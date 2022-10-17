import { AssessmentRadar } from "../graphs/AssessmentRadar"

export const SingleAssessment = () => {
    const data = [
        {
            perspective: "Math",
            You: 120,
            Average: 48,
        },
        {
            perspective: "Science",
            You: 110,
            Average: 38,
        },
        {
            perspective: "English",
            You: 130,
            Average: 98,
        }
    ]
    return <div>
        {/* TODO: heightとwidthをウィンドウサイズから設定 */}
        <div style={{ height: 400, width: 400 }}>
            <AssessmentRadar data={data} />
        </div>
    </div>
}