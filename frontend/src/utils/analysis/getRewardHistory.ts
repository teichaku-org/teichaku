import { DaoHistory } from "@/domains/DaoHistory";
import { BarDatum } from "@nivo/bar";
import { add, format } from "date-fns";

export const getRewardHistory = (myDaoHistory: DaoHistory[], latestPollId: number) => {
  let data: BarDatum[] = [];
  let dummy = "";
  let count = 0;
  for (let pollId = latestPollId; pollId >= 0; pollId--) {
    count += 1;

    const foundDao = myDaoHistory.find((mydao) => mydao.pollId === pollId);
    if (foundDao) {
      let isDateExist = data.find((item) => item.date === format(foundDao.timestamp, "yyyy/MM/dd"));
      let date = foundDao.timestamp;
      while (isDateExist) {
        date = add(date, { days: 1 });
        isDateExist = data.find((item) => item.date === format(date, "yyyy/MM/dd"));
      }
      data.push({
        date: format(date, "yyyy/MM/dd"),
        reward: Math.round(foundDao.reward),
      });
    } else {
      data.push({
        date: (dummy += " "), //NOTE　ユニークにするため
        reward: 0,
      });
    }

    if (count > 10) {
      return data;
    }
  }

  return data;
};
