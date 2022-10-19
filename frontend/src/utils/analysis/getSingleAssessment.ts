import { Assessment } from "@/domains/Assessment";
import { AssessmentStructOutput } from "@/types/DAOHistory";

export const getSingleAssessment = (
    assessments: Assessment[],
    perspectives: string[],
    contributor: string,
    pollId: number) => {
    const assessment = assessments.find(a => a.contributor === contributor && a.pollId === pollId);
    const samePollAssessments = assessments.filter(a => a.pollId === pollId);
    let result = []
    for (const perspective of perspectives) {
        const yourPoint = assessment?.points[perspectives.indexOf(perspective)] ?? 0;
        const averagePoint = samePollAssessments.reduce((acc, cur) => acc + cur.points[perspectives.indexOf(perspective)], 0) / samePollAssessments.length;
        result.push({
            perspective,
            You: yourPoint,
            Average: averagePoint
        })
    }

    return result;
}