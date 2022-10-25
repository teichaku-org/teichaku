import { Assessment } from "@/domains/Assessment";

export const getAverageAssessment = (assessments: Assessment[], perspectives: string[], contributor: string) => {
  const yourAssessments = assessments.filter((a) => a.contributor === contributor);
  let result = [];
  for (const perspective of perspectives) {
    const averagePoint =
      yourAssessments.reduce((acc, cur) => acc + cur.points[perspectives.indexOf(perspective)], 0) /
      yourAssessments.length;
    result.push({
      perspective,
      Point: Math.round(averagePoint),
    });
  }

  return result;
};
