import type { NextPage } from "next";
import { css } from "@emotion/react";

import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Center, Container, Loader } from "@mantine/core";
import AssessmentTab from "@/components/assessment/AssessmentTab";
import NodataMessage from "@/components/common/NodataMsg";

const Assessment: NextPage = () => {
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
      <Center>
        <h1>Your Assessments</h1>
      </Center>
      <AssessmentTab daoHistory={daoHistory} />
    </div>
  );
};

export default Assessment;
