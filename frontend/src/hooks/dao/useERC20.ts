import { useERC20Interface } from "./interface/useERC20Interface"
import useERC20Web2 from "./web2/useERC20Web2"
import useERC20Web3 from "./web3/useERC20Web3"

const useERC20: useERC20Interface = (props: { contractAddress: string }, isWeb3?: boolean) => {
  const selectStrategy = () => {
    if (isWeb3 || isWeb3 == undefined) {
      return useERC20Web3(props)
    } else {
      return useERC20Web2(props)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useERC20
