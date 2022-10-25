import { DaoHistory } from "@/domains/DaoHistory";
import { HistoryList } from "../history/HistoryList";

interface Props {
  myDaoHistory: DaoHistory[];
}

const IndivisualTab = (props: Props) => {
  const { myDaoHistory } = props;
  return <HistoryList data={myDaoHistory} />;
};

export default IndivisualTab;
