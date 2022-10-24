import { Container, Grid, Loader, Paper, Tabs, Title } from "@mantine/core";
import { IconChartLine, IconChartPie3 } from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import { HistoryList } from "../history/HistoryList";
import { AssessmentBar } from "../graphs/AssessmentBar";
import { RewardHistory } from "../graphs/barTestData";
import { AssessmentLine } from "../graphs/AssessmentLine";
import { data } from "../graphs/lineTestData";
import { AssessmentRadar } from "../graphs/AssessmentRadar";
import { EarnedCoin } from "./EarnedCoin";
import { useMediaQuery } from "@mantine/hooks";
import useMetaMask from "@/hooks/web3/useMetaMask";

interface Props {
  daoHistory: DaoHistory[];
}

const AssessmentTab = (props: Props) => {
  const { daoHistory } = props;

  const matches = useMediaQuery("(min-width: 900px)");

  const { address } = useMetaMask();
  if (!address) {
    return (
      <Container>
        <Loader size="lg" variant="dots" />
      </Container>
    );
  }

  //TODO: 自分のアドレスを取得する方法が分からなかったので一旦固定値
  const myDaoHistory = () => {
    return daoHistory.filter((dao) => dao.contributor === address);
  };
  return (
    <Tabs defaultValue="total">
      <Tabs.List>
        <Tabs.Tab value="total" icon={<IconChartLine size={14} />}>
          Total
        </Tabs.Tab>
        <Tabs.Tab value="individual" icon={<IconChartPie3 size={14} />}>
          Individual
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="total" pt="xs">
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
      </Tabs.Panel>

      <Tabs.Panel value="individual" pt="xs">
        <HistoryList data={myDaoHistory()} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTab;
