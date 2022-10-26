import { Container, Paper, Tabs, Title } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconChartLine,
  IconChartPie3,
} from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import { HistoryList } from "../history/HistoryList";
import { AssessmentBar } from "../graphs/AssessmentBar";
import { CumulativeReward, RewardHistory } from "../graphs/barTestData";

interface Props {
  daoHistory: DaoHistory[];
}

const AssessmentTab = (props: Props) => {
  const { daoHistory } = props;

  //TODO: 自分のアドレスを取得する方法が分からなかったので一旦固定値
  const myDaoHistory = () => {
    return daoHistory.filter(
      (dao) => dao.contributor === "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C"
    );
  };
  return (
    <Tabs defaultValue="individual">
      <Tabs.List>
        <Tabs.Tab value="individual" icon={<IconChartPie3 size={14} />}>
          個別
        </Tabs.Tab>
        <Tabs.Tab value="total" icon={<IconChartLine size={14} />}>
          集計
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="individual" pt="xs">
        <HistoryList data={myDaoHistory()} />
      </Tabs.Panel>

      <Tabs.Panel value="total" pt="xs">
        <Container>
          <Title size="h2">累積報酬</Title>
          <Paper mb="xl" style={{ height: 350 }}>
            <AssessmentBar data={CumulativeReward} />
          </Paper>
          <Title size="h2">報酬履歴</Title>
          <Paper style={{ height: 350 }}>
            <AssessmentBar data={RewardHistory} />
          </Paper>
        </Container>
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTab;
