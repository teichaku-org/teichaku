import { BarDatum } from "@nivo/bar";
import { add, format } from "date-fns";

export const getCumulativeReward = (rewardHistory: BarDatum[]) => {
  let total = 0;
  let data = [];
  for (const d of rewardHistory) {
    total += Number(d.reward);
    let isDateExist = data.find((item) => item.x === d.date);
    let date = new Date(d.date)
    while (isDateExist) {
      date = add(date, { days: 1 });
      isDateExist = data.find((item) => item.x === format(date, "yyyy/MM/dd"));
    }
    const newData = { x: format(date, "yyyy/MM/dd"), y: total };
    data.push(newData);
  }

  const result = [
    {
      id: "reward",
      data: data,
    },
  ];

  return result;
};
