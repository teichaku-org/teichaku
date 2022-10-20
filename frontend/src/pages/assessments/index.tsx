import type { NextPage } from "next";
import { css } from "@emotion/react";

import { HistoryList } from "@/components/history/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { LoadingOverlay } from "@mantine/core";

const Assessment: NextPage = () => {
  const { daoHistory, load } = useDaoHistory();

  useEffect(() => {
    load();
  }, []);

  if (!daoHistory) return <LoadingOverlay visible overlayBlur={2} />;
  if (daoHistory.length === 0)
    return <LoadingOverlay visible overlayBlur={2} />;

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

export default Assessment;
