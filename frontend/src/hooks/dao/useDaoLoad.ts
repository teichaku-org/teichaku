import { useDaoLoadInterface } from "./interface/useDaoLoadInterface"
import { useDaoLoadWeb2 } from "./web2/useDaoLoadWeb2"
import { useDaoLoadWeb3 } from "./web3/useDaoLoadWeb3"

export const useDaoLoad: useDaoLoadInterface = (isWeb3?: boolean) => {
  const selectStrategy = () => {
    if (isWeb3 || isWeb3 == undefined) {
      return useDaoLoadWeb3()
    } else {
      return useDaoLoadWeb2()
    }
  }
  const strategy = selectStrategy()

  return strategy
}
