import { DaoHistory } from "@/domains/DaoHistory"
import { HistoryList } from "../history/HistoryList"

interface Props {
  myDaoHistory: DaoHistory[]
  isWeb3: boolean
}

const IndivisualTab = (props: Props) => {
  const { myDaoHistory } = props
  return <HistoryList data={myDaoHistory} isWeb3={props.isWeb3} />
}

export default IndivisualTab
