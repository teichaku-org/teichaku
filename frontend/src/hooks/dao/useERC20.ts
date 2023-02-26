import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useAtom } from "jotai"
import { useERC20Interface } from "./interface/useERC20Interface"
import useERC20Web3 from "./web3/useERC20Web3"

const useERC20: useERC20Interface = (
  props: {
    contractAddress: string
  },
  isWeb3
) => {
  const selectStrategy = () => {
    if (isWeb3) {
      return useERC20Web3(props, isWeb3)
    } else {
      return useERC20Web3(props, isWeb3)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useERC20
