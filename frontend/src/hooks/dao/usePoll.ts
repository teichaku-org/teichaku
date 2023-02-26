import { usePollInterface } from "./interface/usePollInterface"
import usePollWeb2 from "./web2/usePollWeb2"
import usePollWeb3 from "./web3/usePollWeb3"

const usePoll: usePollInterface = (props: { daoId: string; projectId: string }, isWeb3: boolean) => {
  const selectStrategy = () => {
    if (isWeb3) {
      return usePollWeb3(props, isWeb3)
    } else {
      return usePollWeb2(props, isWeb3)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default usePoll
