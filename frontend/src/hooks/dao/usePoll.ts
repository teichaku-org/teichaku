import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { usePollInterface } from "./interface/usePollInterface"
import usePollWeb2 from "./web2/usePollWeb2"
import usePollWeb3 from "./web3/usePollWeb3"

const usePoll: usePollInterface = (props: { daoId: string; projectId: string }) => {
  const [isWeb3] = useAtom(Web3FlagAtom)
  const selectStrategy = () => {
    if (isWeb3) {
      return usePollWeb3(props)
    } else {
      return usePollWeb2(props)
    }
  }
  const strategy = selectStrategy()
  return strategy
}

export default usePoll
