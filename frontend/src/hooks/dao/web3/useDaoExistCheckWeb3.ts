import { DAOHistory } from "@/types"
import { useRouter } from "next/router"
import { useEffect } from "react"
import artifact from "../../../abi/DAOHistory.sol/DAOHistory.json"
import { getContract } from "../../web3/useMetaMask"
import { useDaoExistCheckInterface } from "../interface/useDaoExistCheckInterface"

export const useDaoExistCheckWeb3: useDaoExistCheckInterface = () => {
  const router = useRouter()
  const { daoId, projectId } = router.query

  const contractAddress = process.env.NEXT_PUBLIC_DAOHISTORY_CONTRACT_ADDRESS as string
  const contract = getContract(contractAddress, artifact.abi) as DAOHistory

  useEffect(() => {
    if (daoId) {
      // daoが存在しているか確認
      console.log("daoId check", daoId)
      contract.functions.getDaoInfo(daoId as string).then((res) => {
        console.log("daoId check res", res)
        if (res[0].name === "") {
          router.push("/create-dao")
          return
        }
      })
    }
  }, [daoId])
}
