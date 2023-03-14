import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { useDaoExistCheckInterface } from "./interface/useDaoExistCheckInterface"
import { useDaoExistCheckWeb2 } from "./web2/useDaoExistCheckWeb2"
import { useDaoExistCheckWeb3 } from "./web3/useDaoExistCheckWeb3"

export const useDaoExistCheck: useDaoExistCheckInterface = (isWeb3: boolean) => {
  const [_, setIsWeb3] = useAtom(Web3FlagAtom)
  const selectStrategy = () => {
    if (isWeb3 || isWeb3 == undefined) {
      return useDaoExistCheckWeb3(isWeb3)
    } else {
      return useDaoExistCheckWeb2(isWeb3)
    }
  }
  setIsWeb3(isWeb3)
  const strategy = selectStrategy()

  return strategy
}
