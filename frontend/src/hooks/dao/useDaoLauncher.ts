import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { useDaoLauncherInterface } from "./interface/useDaoLauncherInterface"
import useDaoLauncherWeb2 from "./web2/useDaoLauncherWeb2"
import useDaoLauncherWeb3 from "./web3/useDaoLauncherWeb3"

const useDaoLauncher: useDaoLauncherInterface = () => {
  const [isWeb3] = useAtom(Web3FlagAtom)
  const selectStrategy = () => {
    if (isWeb3) {
      return useDaoLauncherWeb3(isWeb3)
    } else {
      return useDaoLauncherWeb2(isWeb3)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useDaoLauncher
