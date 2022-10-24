import { Grid, Paper, ThemeIcon, Title } from "@mantine/core";

import { AssessmentBar } from "../graphs/AssessmentBar";
import { RewardHistory } from "../graphs/barTestData";
import { AssessmentLine } from "../graphs/AssessmentLine";
import { data } from "../graphs/lineTestData";
import { AssessmentRadar } from "../graphs/AssessmentRadar";
import { TotalReward } from "./TotalReward";
import {
  IconChartBar,
  IconChartLine,
  IconChartRadar,
  IconCoin,
} from "@tabler/icons";

const TotalTab = () => {
  const TotalRewardCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon
            size="md"
            radius="md"
            variant="light"
            color="violet"
            mr="xs"
          >
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
          <TotalReward reward={"20000"} />
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
          <ThemeIcon
            size="md"
            radius="md"
            variant="light"
            color="green"
            mr="xs"
          >
            <IconChartRadar size={16} stroke={1.5} />
          </ThemeIcon>
          Average Assessment
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentRadar data={[]} />
        </Paper>
      </>
    );
  };

  const RewardHistoryCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon
            size="md"
            radius="md"
            variant="light"
            color="grape"
            mr="xs"
          >
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
