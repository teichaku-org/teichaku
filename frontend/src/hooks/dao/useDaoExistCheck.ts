import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { useDaoExistCheckInterface } from "./interface/useDaoExistCheckInterface"
import { useDaoExistCheckWeb2 } from "./web2/useDaoExistCheckWeb2"
import { useDaoExistCheckWeb3 } from "./web3/useDaoExistCheckWeb3"

export const useDaoExistCheck: useDaoExistCheckInterface = () => {
  const [isWeb3] = useAtom(Web3FlagAtom)
  const selectStrategy = () => {
    if (isWeb3) {
      return useDaoExistCheckWeb3()
    } else {
      return useDaoExistCheckWeb2()
    }
  }
  const strategy = selectStrategy()

  return strategy
}
