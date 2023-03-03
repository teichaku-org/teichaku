import { useDaoLauncherInterface } from "./interface/useDaoLauncherInterface"
import useDaoLauncherWeb2 from "./web2/useDaoLauncherWeb2"
import useDaoLauncherWeb3 from "./web3/useDaoLauncherWeb3"

const useDaoLauncher: useDaoLauncherInterface = (isWeb3?: boolean) => {
  const selectStrategy = () => {
    if (isWeb3 || isWeb3 == undefined) {
      return useDaoLauncherWeb3()
    } else {
      return useDaoLauncherWeb2()
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useDaoLauncher
