import { DaoHistory } from "@/domains/DaoHistory";
import { BarDatum } from "@nivo/bar";
import { format } from "date-fns";

//開催中のpollIdを取得(currentMaxPollId())-1
//DaoHistoryのリストからfindする
//1０回分くらい上記をループする
//なければ歯抜け
//timestampが日付
export const getRewardHistory = (myDaoHistory: DaoHistory[], latestPollId: number) => {
  let data: BarDatum[] = [];
  for (let pollId = latestPollId; pollId >= 0; pollId--) {
    const foundDao = myDaoHistory.find((mydao) => mydao.pollId === pollId);
    if (foundDao) {
      data.unshift({
        date: format(foundDao.timestamp, "yyyy/MM/dd"),
        reward: Math.round(foundDao.reward),
      });
    } else {
      data.unshift({
        date: pollId, //TODO 歯抜けの時の日付を設定する
        reward: 0,
      });
    }
  }

  console.log(data);

  return data;
};
