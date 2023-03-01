import { PollContractAddress } from "@/domains/atoms/DaoContractAddressAtom"
import {
  TokenNameAtom,
  TokenSymbolAtom,
  TokenTotalSupplyAtom,
  TreasuryBalanceAtom,
  YourBalanceAtom,
} from "@/domains/atoms/TokenAtom"
import { useAtom } from "jotai"
import { useDaoTokenInterface } from "../interface/useDaoTokenInterface"
import { APIClient } from "@/utils/APIClient"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { useEffect } from "react"

interface Props {
  daoId: string
  projectId: string
}
const useDaoTokenWeb2: useDaoTokenInterface = (props: Props) => {
  const [tokenName, setTokenName] = useAtom(TokenNameAtom)
  const [tokenSymbol, setTokenSymbol] = useAtom(TokenSymbolAtom)
  const [tokenTotalSupply, setTokenTotalSupply] = useAtom(TokenTotalSupplyAtom)
  const [yourBalance, setYourBalance] = useAtom(YourBalanceAtom)
  const [treasuryBalance, setTreasuryBalance] = useAtom(TreasuryBalanceAtom)
  const [pollAddress] = useAtom(PollContractAddress)
  const contractAddress = ""
  const apiClient = new APIClient()
  const { getUserIdToken } = useWeb3Auth()

  const load = async () => {
    setTokenName("Point")
    setTokenSymbol("pt")
    const idToken = await getUserIdToken()
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    const res = await apiClient.post(
      "/getMyBalance",
      {
        daoId: props.daoId,
      },
      headers
    )
    if (res) {
      setYourBalance(res.data.amount)
    }
  }

  useEffect(() => {
    if (!(props.daoId && props.projectId)) return
    load()
  }, [props.daoId, props.projectId])

  const sendToken = async (to: string, amount: number) => {}

  return {
    load,
    tokenName,
    tokenSymbol,
    tokenTotalSupply,
    yourBalance,
    contractAddress,
    treasuryBalance,
    sendToken,
  }
}

export default useDaoTokenWeb2
