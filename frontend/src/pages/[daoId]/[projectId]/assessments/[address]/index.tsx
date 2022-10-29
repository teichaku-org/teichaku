import type { NextPage } from "next";

import AssessmentTab from "@/components/assessment/AssessmentTabs";
import NodataMessage from "@/components/common/NodataMsg";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useDaoLoad } from "@/hooks/dao/useDaoLoad";
import { shortenAddress } from "@/utils/shortenAddress";
import { Center, Container, Loader, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Assessment: NextPage = () => {
  useDaoExistCheck()
  useDaoLoad()
  const router = useRouter()
  const { daoId, projectId, address } = router.query
  const { daoHistory, load, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
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
        <Title size="h1">{shortenAddress(address as string)} Assessments</Title>
      </Center>
      <AssessmentTab daoHistory={daoHistory} address={address as string} />
    </div>
  );
};

export default Assessment;
