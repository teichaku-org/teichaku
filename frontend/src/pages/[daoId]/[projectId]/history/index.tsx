import type { NextPage } from "next";

import { HistoryList } from "@/components/history/HistoryList";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Center, Loader } from "@mantine/core";
import NodataMessage from "@/components/common/NodataMsg";
import { useRouter } from "next/router";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";
import { useDaoLoad } from "@/hooks/dao/useDaoLoad";
import { FloatingAddButton } from "@/components/contribution/FloatingAddButton";
import { useLocale } from "@/i18n/useLocale";

const History: NextPage = () => {
  const { t } = useLocale();
  useDaoExistCheck();
  useDaoLoad();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const { daoHistory, daoInfo, load } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
  const title = t.History.Title(daoInfo?.name || "DAO");
  const subTitle = t.History.SubTitle(daoInfo?.name || "DAO");
  useEffect(() => {
    if (daoId && projectId) {
      load();
    }
  }, [daoId, projectId]);

  if (!daoHistory)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    );
  if (daoHistory.length === 0) return <NodataMessage />;

  return (
    <div>
      <HistoryList data={daoHistory} title={title} subTitle={subTitle} />
      <FloatingAddButton />
    </div>
  );
};

export default History;
