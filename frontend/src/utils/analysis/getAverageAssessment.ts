import { DaoHistory } from "./../../domains/DaoHistory";
import { Assessment } from "@/domains/Assessment";
import { getSingleAssessment } from "./getSingleAssessment";

export const getAverageAssessment = (
  assessments: Assessment[],
  perspectives: string[],
  contributor: string,
  daoHistory: DaoHistory[]
) => {
  const myDaoHistory = daoHistory.filter((dao) => dao.contributor === contributor);

  //singleAssessmentを集める
  const singleAssessments = [];
  for (const mydao of myDaoHistory) {
    const singleAssessment = getSingleAssessment(assessments, perspectives, contributor, mydao.pollId);
    singleAssessments.push(singleAssessment);
  }

  //singleAssessmentsの各観点別の評価点数合計を計算する
  let totalAssesment: { [index: string]: number } = {};
  for (const singleAssessment of singleAssessments) {
    for (const data of singleAssessment) {
      const point = totalAssesment[data.perspective];
      if (point) {
        totalAssesment = { ...totalAssesment, [data.perspective]: point + data.Point };
      } else {
        totalAssesment = { ...totalAssesment, [data.perspective]: data.Point };
      }
    }
  }

  //各観点別の評価点数平均を計算する
  let result = [];
  for (const key in totalAssesment) {
    result.push({
      perspective: key,
      Point: Math.round(totalAssesment[key] / myDaoHistory.length * 100) / 100, //小数第2位
    });
  }
  return result;
};
