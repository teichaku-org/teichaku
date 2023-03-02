import { useDaoHistoryInterface } from "./interface/useDaoHistoryInterface"
import useDaoHistoryWeb2 from "./web2/useDaoHistoryWeb2"
import useDaoHistoryWeb3 from "./web3/useDaoHistoryWeb3"

interface Props {
  daoId: string
  projectId: string
}

const useDaoHistory: useDaoHistoryInterface = (props: Props, isWeb3?: boolean) => {
  const selectStrategy = () => {
    if (isWeb3 || isWeb3 == undefined) {
      return useDaoHistoryWeb3(props)
    } else {
      return useDaoHistoryWeb2(props)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useDaoHistory
