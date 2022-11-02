import type { NextPage } from "next";

import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Center, Container, Loader, Title } from "@mantine/core";
import AssessmentTab from "@/components/assessment/AssessmentTabs";
import NodataMessage from "@/components/common/NodataMsg";
import { useRouter } from "next/router";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";
import { useDaoLoad } from "@/hooks/dao/useDaoLoad";
import useMetaMask from "@/hooks/web3/useMetaMask";
import { useLocale } from "@/i18n/useLocale";

const Assessment: NextPage = () => {
  useDaoExistCheck();
  useDaoLoad();
  const router = useRouter();
  const { t } = useLocale();
  const { daoId, projectId } = router.query;
  const { daoHistory, load, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
  const { address } = useMetaMask();
  useEffect(() => {
    if (daoId && projectId) {
      load();
    }
  }, [daoId, projectId]);

  if (!daoHistory && !assessments)
    return (
      <Container>
        <Loader size="lg" variant="dots" />
      </Container>
    );
  if (daoHistory.length === 0) return <NodataMessage />;

  return (
    <div>
      <Center>
        <Title size="h1">{t.Assessment.Title}</Title>
      </Center>
      <AssessmentTab daoHistory={daoHistory} address={address} />
    </div>
  );
};

export default Assessment;
