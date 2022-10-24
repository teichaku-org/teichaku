import { Container, Loader, Tabs } from "@mantine/core";

import { DaoHistory } from "@/domains/DaoHistory";
import { HistoryList } from "../history/HistoryList";

import useMetaMask from "@/hooks/web3/useMetaMask";

interface Props {
  daoHistory: DaoHistory[];
}

const IndivisualTab = (props: Props) => {
  const { daoHistory } = props;

  const { address } = useMetaMask();
  if (!address) {
    return (
      <Container>
        <Loader size="lg" variant="dots" />
      </Container>
    );
  }

  const myDaoHistory = () => {
    return daoHistory.filter((dao) => dao.contributor === address);
  };
  return <HistoryList data={myDaoHistory()} />;
};

export default IndivisualTab;
