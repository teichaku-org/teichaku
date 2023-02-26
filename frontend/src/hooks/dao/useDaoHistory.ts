import { useDaoHistoryInterface } from "./interface/useDaoHistoryInterface"
import useDaoHistoryWeb2 from "./web2/useDaoHistoryWeb2"
import useDaoHistoryWeb3 from "./web3/useDaoHistoryWeb3"

interface Props {
  daoId: string
  projectId: string
}

const useDaoHistory: useDaoHistoryInterface = (props: Props, isWeb3: boolean) => {
  const selectStrategy = () => {
    if (isWeb3) {
      return useDaoHistoryWeb3(props, isWeb3)
    } else {
      return useDaoHistoryWeb2(props, isWeb3)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useDaoHistory
