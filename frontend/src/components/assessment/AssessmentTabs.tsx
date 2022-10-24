import { Tabs } from "@mantine/core";
import { IconChartLine, IconChartPie3 } from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import IndivisualTab from "./IndivisualTab";
import TotalTab from "./TotalTab";

interface Props {
  daoHistory: DaoHistory[];
}

const AssessmentTabs = (props: Props) => {
  const { daoHistory } = props;

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
        <TotalTab />
      </Tabs.Panel>

      <Tabs.Panel value="individual" pt="xs">
        <IndivisualTab daoHistory={daoHistory} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTabs;
