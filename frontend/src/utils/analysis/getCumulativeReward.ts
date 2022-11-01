import { BarDatum } from "@nivo/bar";
import { add, format } from "date-fns";

export const getCumulativeReward = (rewardHistory: BarDatum[]) => {
  let total = 0;
  let data = [];
  const isInvalidDate = (date: Date) => Number.isNaN(date.getTime());
  for (const d of rewardHistory) {
    total += Number(d.reward);
    let isDateExist = data.find((item) => item.x === d.date);
    let date = new Date(d.date)
    if (isInvalidDate(date)) {
      //NOTE: 苦しいが空白文字の日付が来ることがあるのでそれは通す
      const newData = { x: d.date, y: total };
      data.push(newData);
      continue
    }
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
