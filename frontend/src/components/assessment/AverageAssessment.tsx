import useDaoHistory from "@/hooks/dao/useDaoHistory";
import usePoll from "@/hooks/dao/usePoll";
import { useLocale } from "@/i18n/useLocale";
import { getAverageAssessment } from "@/utils/analysis/getAverageAssessment";
import { Paper, ThemeIcon, Title } from "@mantine/core";
import { IconChartRadar } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AssessmentRadar } from "../graphs/AssessmentRadar";

interface Props {
  address: string;
}

export const AverageAssessment = (props: Props) => {
  const { t } = useLocale();
  const { AverageAssessmentTitle } = t.Assessment.AssessmentTabs.TotalTab;
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const { pollDetail, loadCurrentMaxPoll } = usePoll({ daoId: daoId as string, projectId: projectId as string });
  const { daoHistory, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string });
  const perspectives = pollDetail?.perspectives || [];
  console.log({ perspectives });
  const averageAccessment = getAverageAssessment(assessments, perspectives, props.address, daoHistory);
  console.log({ averageAccessment });
  useEffect(() => {
    loadCurrentMaxPoll();
  }, []);

  return (
    <>
      <Title mt="md" size="h3">
        <ThemeIcon size="md" radius="md" variant="light" color="green" mr="xs">
          <IconChartRadar size={16} stroke={1.5} />
        </ThemeIcon>
        {AverageAssessmentTitle}
      </Title>
      <Paper mt="xs" style={{ height: 310 }}>
        <AssessmentRadar data={averageAccessment} />
      </Paper>
    </>
  );
};
