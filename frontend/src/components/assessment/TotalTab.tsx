import { Grid, Paper, ThemeIcon, Title } from "@mantine/core";

import { AssessmentBar } from "../graphs/AssessmentBar";
import { RewardHistory } from "../graphs/barTestData";
import { AssessmentLine } from "../graphs/AssessmentLine";
import { data } from "../graphs/lineTestData";
import { AssessmentRadar } from "../graphs/AssessmentRadar";
import { TotalReward } from "./TotalReward";
import { IconChartBar, IconChartLine, IconChartRadar, IconCoin } from "@tabler/icons";
import { DaoHistory } from "@/domains/DaoHistory";
import { Assessment } from "@/domains/Assessment";
import { getAverageAssessment } from "@/utils/analysis/getAverageAssessment";
import { useEffect, useState } from "react";
import usePoll from "@/hooks/dao/usePoll";

interface Props {
  myDaoHistory: DaoHistory[];
  assessments: Assessment[];
  address: string;
}

const TotalTab = (props: Props) => {
  const { myDaoHistory, assessments, address } = props;
  const { fetchPollDetail } = usePoll();
  const [perspectives, setPerspectives] = useState<string[]>([]);

  useEffect(() => {
    //TODO pollIdごとにperspectivesが変わることがある？？
    fetchPollDetail(myDaoHistory[0].pollId).then((res) => {
      setPerspectives(res.perspectives);
    });
  }, []);

  const totalReward = myDaoHistory.reduce(function (sum, element) {
    return sum + element.reward;
  }, 0);

  const averageAccessment = getAverageAssessment(assessments, perspectives, address);

  const TotalRewardCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="violet" mr="xs">
            <IconCoin size={16} stroke={1.5} />
          </ThemeIcon>
          Total Reward
        </Title>
        <Paper
          mt="xs"
          style={{
            height: 310,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TotalReward reward={String(Math.round(totalReward))} />
        </Paper>
      </>
    );
  };

  const CumulativeReward = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="blue" mr="xs">
            <IconChartLine size={16} stroke={1.5} />
          </ThemeIcon>
          Cumulative Reward
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentLine data={data} />
        </Paper>
      </>
    );
  };

  const AverageAssessment = () => {
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

  const RewardHistoryCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="grape" mr="xs">
            <IconChartBar size={16} stroke={1.5} />
          </ThemeIcon>
          Reward History
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentBar data={RewardHistory} />
        </Paper>
      </>
    );
  };

  return (
    <Grid>
      <Grid.Col md={12} lg={4}>
        <TotalRewardCol />
      </Grid.Col>
      <Grid.Col md={12} lg={8}>
        <CumulativeReward />
      </Grid.Col>
      <Grid.Col md={12} lg={4}>
        <AverageAssessment />
      </Grid.Col>
      <Grid.Col md={12} lg={8}>
        <RewardHistoryCol />
      </Grid.Col>
    </Grid>
  );
};

export default TotalTab;
