import { Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle } from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import { HistoryList } from "../history/HistoryList";

interface Props {
  daoHistory: DaoHistory[];
}

const AssessmentTab = (props: Props) => {
  const { daoHistory } = props;
  //渡すときに自分だけのリストにしてしまうか
  return (
    <Tabs defaultValue="individual">
      <Tabs.List>
        <Tabs.Tab value="individual" icon={<IconPhoto size={14} />}>
          個別
        </Tabs.Tab>
        <Tabs.Tab value="total" icon={<IconMessageCircle size={14} />}>
          集計
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="individual" pt="xs">
        <HistoryList data={daoHistory} />
      </Tabs.Panel>

      <Tabs.Panel value="total" pt="xs">
        集計
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTab;
