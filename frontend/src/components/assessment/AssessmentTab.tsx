import { Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconChartLine,
  IconChartPie3,
} from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import { HistoryList } from "../history/HistoryList";

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
        集計
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTab;
