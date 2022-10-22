import type { NextPage } from "next";
import { css } from "@emotion/react";

import { HistoryList } from "@/components/history/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Center, Container, Loader } from "@mantine/core";
import NodataMessage from "@/components/common/NodataMsg";

const History: NextPage = () => {
  const { daoHistory, load } = useDaoHistory();

  useEffect(() => {
    load();
  }, []);

  if (!daoHistory)
    return (
      <Container>
        <Loader size="lg" variant="dots" />
      </Container>
    );
  if (daoHistory.length === 0) return <NodataMessage />;

  return (
    <div
    >
      <HistoryList data={daoHistory} title="The History of DAO" />
    </div>
  );
};

export default History;
