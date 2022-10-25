import type { NextPage } from "next";
import { css } from "@emotion/react";

import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Center, Container, Loader, Title } from "@mantine/core";
import AssessmentTab from "@/components/assessment/AssessmentTabs";
import NodataMessage from "@/components/common/NodataMsg";
import { useRouter } from "next/router";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";

const Assessment: NextPage = () => {
  useDaoExistCheck();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const { daoHistory, assessments, load } = useDaoHistory({
    daoId: daoId as string,
    projectId: projectId as string,
  });

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
        <Title size="h1">Your Assessments</Title>
      </Center>
      <AssessmentTab daoHistory={daoHistory} assessments={assessments} />
    </div>
  );
};

export default Assessment;
