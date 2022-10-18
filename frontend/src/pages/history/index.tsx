import type { NextPage } from "next";
import { css } from "@emotion/react";

import { HistoryList } from "@/components/history/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";

const History: NextPage = () => {
  const { daoHistory, load } = useDaoHistory();

  useEffect(() => {
    load();
  }, []);

  if (!daoHistory) return <div>loading...</div>;
  if (daoHistory.length === 0) return <div>no data</div>;

  return (
    <div
      css={css`
        margin: 5px;
      `}
    >
      <HistoryList data={daoHistory} />
    </div>
  );
};

export default History;
