import { Assessment } from "@/domains/Assessment";
import { AssessmentStructOutput } from "@/types/DAOHistory";

export const getSingleAssessment = (assessments: Assessment[], contributor: string, pollId: number) => {
    const assessment = assessments.find(a => a.contributor === contributor && a.pollId === pollId);
}