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
import { APIClient } from "@/types/APIClient"

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

  const load = async () => {
    setTokenName("Point")
    setTokenSymbol("pt")
    const res = await apiClient.post("/getMyBalance", {
      daoId: props.daoId,
    })
    if (res) {
      setYourBalance(res.data.amount)
      console.log(res.data.amount)
    }
  }

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
