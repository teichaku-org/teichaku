import { usePollInterface } from "./interface/usePollInterface"
import usePollWeb2 from "./web2/usePollWeb2"
import usePollWeb3 from "./web3/usePollWeb3"

const usePoll: usePollInterface = (props: { daoId: string; projectId: string }, isWeb3?: boolean) => {
  const selectStrategy = () => {
    if (isWeb3 || isWeb3 == undefined) {
      return usePollWeb3(props)
    } else {
      return usePollWeb2(props)
    }
  }
  const strategy = selectStrategy()
  return strategy
}

export default usePoll
