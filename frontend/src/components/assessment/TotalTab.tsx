import { Grid, Paper, Tabs, Title } from "@mantine/core";
import { IconChartLine, IconChartPie3 } from "@tabler/icons";

import { AssessmentBar } from "../graphs/AssessmentBar";
import { RewardHistory } from "../graphs/barTestData";
import { AssessmentLine } from "../graphs/AssessmentLine";
import { data } from "../graphs/lineTestData";
import { AssessmentRadar } from "../graphs/AssessmentRadar";
import { EarnedCoin } from "./EarnedCoin";
import { useMediaQuery } from "@mantine/hooks";

const TotalTab = () => {
  const matches = useMediaQuery("(min-width: 900px)");

  return (
    <>
      {matches ? (
        <Grid>
          <Grid.Col span={4}>
            <Title mt="md" size="h3">
              Total Reward
            </Title>
            <Paper mt="xs" style={{ height: 310 }}>
              <EarnedCoin reward={"20000"} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={8}>
            <Title mt="md" size="h3">
              Cumulative Reward
            </Title>
            <Paper mt="xs" style={{ height: 310 }}>
              <AssessmentLine data={data} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title mt="md" size="h3">
              Average Assessment
            </Title>
            <Paper mt="xs" style={{ height: 310 }}>
              <AssessmentRadar data={[]} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={8}>
            <Title mt="md" size="h3">
              Reward History
            </Title>
            <Paper mt="xs" style={{ height: 310 }}>
              <AssessmentBar data={RewardHistory} />
            </Paper>
          </Grid.Col>
        </Grid>
      ) : (
        <>
          <Title mt="md" size="h3">
            Total Reward
          </Title>
          <Paper mt="xs" style={{ height: 150 }}>
            <EarnedCoin reward={"20000"} />
          </Paper>

          <Title mt="md" size="h3">
            Cumulative Reward
          </Title>
          <Paper mt="xs" style={{ height: 310 }}>
            <AssessmentLine data={data} />
          </Paper>

          <Title mt="md" size="h3">
            Total Assessment
          </Title>
          <Paper mt="xs" style={{ height: 310 }}>
            <AssessmentRadar data={[]} />
          </Paper>

          <Title mt="md" size="h3">
            Reward History
          </Title>
          <Paper mt="xs" style={{ height: 310 }}>
            <AssessmentBar data={RewardHistory} />
          </Paper>
        </>
      )}
    </>
  );
};

export default TotalTab;
