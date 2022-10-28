import useDaoHistory from "@/hooks/dao/useDaoHistory";
import usePoll from "@/hooks/dao/usePoll";
import useMetaMask from "@/hooks/web3/useMetaMask";
import { getAverageAssessment } from "@/utils/analysis/getAverageAssessment";
import { Loader, Paper, ThemeIcon, Title } from "@mantine/core";
import { IconChartRadar } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AssessmentRadar } from "../graphs/AssessmentRadar";

export const AverageAssessment = () => {
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const { pollDetail, loadCurrentMaxPoll } = usePoll({ daoId: daoId as string, projectId: projectId as string });
  const { address } = useMetaMask();
  const { daoHistory, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
  const perspectives = pollDetail?.perspectives || []
  const averageAccessment = getAverageAssessment(assessments, perspectives, address, daoHistory);

  useEffect(() => {
    loadCurrentMaxPoll()
  }, [])

  return (
    <>
      <Title mt="md" size="h3">
        <ThemeIcon size="md" radius="md" variant="light" color="green" mr="xs">
          <IconChartRadar size={16} stroke={1.5} />
        </ThemeIcon>
        Average Assessment
      </Title>
      <Paper mt="xs" style={{ height: 310 }}>
        <AssessmentRadar data={averageAccessment} />
      </Paper>
    </>
  );
};
