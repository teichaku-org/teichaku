import type { NextPage } from "next";
import { css } from "@emotion/react";

import { HistoryList } from "@/components/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";

const Ranking: NextPage = () => {
  const { daoHistory } = useDaoHistory();
  if (!daoHistory) return <div>loading...</div>;
  if (daoHistory.length === 0) return <div>no data</div>;

  console.log({ daoHistory });
  return (
    <div
      css={css`
        margin: 32px 300px;
      `}
    >
      <HistoryList data={daoHistory} />
    </div>
  );
};

export default Ranking;
