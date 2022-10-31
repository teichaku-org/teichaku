import { Assessment } from "@/domains/Assessment";

export const getSingleAssessment = (
    assessments: Assessment[],
    perspectives: string[],
    contributor: string,
    pollId: number) => {
    const targetAssessments = assessments.filter(a => a.contributor === contributor && a.pollId === pollId);
    const samePollAssessments = assessments.filter(a => a.pollId === pollId);
    let result = []

    for (const perspective of perspectives) {
        const yourPoint = targetAssessments.reduce((acc, cur) => acc + cur.points[perspectives.indexOf(perspective)], 0) / targetAssessments.length;
        const averagePoint = samePollAssessments.reduce((acc, cur) => acc + cur.points[perspectives.indexOf(perspective)], 0) / samePollAssessments.length;
        result.push({
            perspective,
            Point: yourPoint,
            Average: averagePoint
        })

    }
    return result;
}