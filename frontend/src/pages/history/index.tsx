import type { NextPage } from "next";
import { css } from "@emotion/react";

import { HistoryList } from "@/components/history/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";

const History: NextPage = () => {
  const { daoHistory } = useDaoHistory();
  if (!daoHistory) return <div>loading...</div>;
  if (daoHistory.length === 0) return <div>no data</div>;

  console.log({ daoHistory });
  return (
    <div
      css={css`
        margin: 32px 5%;
      `}
    >
      <HistoryList data={daoHistory} />
    </div>
  );
};

export default History;
