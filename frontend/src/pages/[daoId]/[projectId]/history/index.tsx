import type { NextPage } from "next";
import { css } from "@emotion/react";

import { HistoryList } from "@/components/history/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Center, Container, Loader } from "@mantine/core";
import NodataMessage from "@/components/common/NodataMsg";
import { useRouter } from "next/router";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";

const History: NextPage = () => {
  useDaoExistCheck()

  const router = useRouter()
  const { daoId, projectId } = router.query
  const { daoHistory, daoInfo, load } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
  const title = `The History of ${daoInfo?.name || "DAO"}`
  const subTitle = `A list of contributions of the ${daoInfo?.name || "DAO"} member`

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
      <HistoryList data={daoHistory} title={title} subTitle={subTitle} />
    </div>
  );
};

export default History;
