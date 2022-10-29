import { Container, Tabs, Text } from "@mantine/core";
import { IconChartLine, IconChartPie3 } from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import IndivisualTab from "./IndivisualTab";
import TotalTab from "./TotalTab";
import useMetaMask from "@/hooks/web3/useMetaMask";
import { Assessment } from "@/domains/Assessment";

interface Props {
  daoHistory: DaoHistory[];
  address: string
}

const AssessmentTabs = (props: Props) => {
  const { daoHistory, address } = props;
  if (!address) {
    return (
      <Container>
        <Text>You don't connect metamask yet. Connect wallet from right top button.</Text>
      </Container>
    );
  }

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
        <TotalTab myDaoHistory={myDaoHistory()} address={address} />
      </Tabs.Panel>

      <Tabs.Panel value="individual" pt="xs">
        <IndivisualTab myDaoHistory={myDaoHistory()} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTabs;
