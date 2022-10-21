import type { NextPage } from "next";
import { css } from "@emotion/react";

import useDaoHistory from "@/hooks/dao/useDaoHistory";
import { useEffect } from "react";
import { Container, Loader } from "@mantine/core";
import AssessmentTab from "@/components/assessment/AssessmentTab";

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
  if (daoHistory.length === 0)
    return (
      <Container>
        <Loader size="lg" variant="dots" />
      </Container>
    );

  return (
    <div
      css={css`
        margin: 5px;
      `}
    >
      <AssessmentTab daoHistory={daoHistory} />
    </div>
  );
};

export default Assessment;
