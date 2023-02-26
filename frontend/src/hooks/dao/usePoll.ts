import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { usePollInterface } from "./interface/usePollInterface"
import usePollWeb2 from "./web2/usePollWeb2"
import usePollWeb3 from "./web3/usePollWeb3"

const usePoll: usePollInterface = (props: { daoId: string; projectId: string }) => {
  const [isWeb3] = useAtom(Web3FlagAtom)
  const web3 = usePollWeb3(props)
  const web2 = usePollWeb2(props)
  return isWeb3 ? web3 : web2
}

export default usePoll
