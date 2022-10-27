import { DaoHistory } from "@/domains/DaoHistory";
import { BarDatum } from "@nivo/bar";
import { format } from "date-fns";

export const getRewardHistory = (myDaoHistory: DaoHistory[], latestPollId: number) => {
  let data: BarDatum[] = [];
  let dummy = "";
  let count = 0;
  for (let pollId = latestPollId; pollId >= 0; pollId--) {
    count += 1;

    const foundDao = myDaoHistory.find((mydao) => mydao.pollId === pollId);
    if (foundDao) {
      data.unshift({
        date: format(foundDao.timestamp, "yyyy/MM/dd"),
        reward: Math.round(foundDao.reward),
      });
    } else {
      data.unshift({
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
