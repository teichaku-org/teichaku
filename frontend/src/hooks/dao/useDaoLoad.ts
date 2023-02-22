import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { useDaoLoadInterfaceIsWeb3 } from "./interface/useDaoLoadInterface"
import { useDaoLoadWeb2 } from "./web2/useDaoLoadWeb2"
import { useDaoLoadWeb3 } from "./web3/useDaoLoadWeb3"

export const useDaoLoad: useDaoLoadInterfaceIsWeb3 = (isWeb3) => {
  const selectStrategy = () => {
    if (isWeb3) {
      return useDaoLoadWeb3()
    } else {
      return useDaoLoadWeb2()
    }
  }
  const strategy = selectStrategy()

  return strategy
}
