import { useDaoTokenInterfaceIsWeb3 } from "./interface/useDaoTokenInterface"
import useDaoTokenWeb2 from "./web2/useDaoTokenWeb2"
import useDaoTokenWeb3 from "./web3/useDaoTokenWeb3"

interface Props {
  daoId: string
  projectId: string
}

const useDaoToken: useDaoTokenInterfaceIsWeb3 = (props: Props, isWeb3: boolean) => {
  const selectStrategy = () => {
    if (isWeb3) {
      return useDaoTokenWeb3(props)
    } else {
      return useDaoTokenWeb2(props)
    }
  }
  const strategy = selectStrategy()

  return strategy
}

export default useDaoToken
