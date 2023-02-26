import { useRouter } from "next/router"
import { useDaoExistCheckInterface } from "../interface/useDaoExistCheckInterface"
import { useEffect } from "react"
import { APIClient } from "@/utils/APIClient"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"

export const useDaoExistCheckWeb2: useDaoExistCheckInterface = () => {
  const router = useRouter()
  const { daoId, projectId } = router.query
  const { getUserIdToken } = useWeb3Auth()
  const apiClient = new APIClient()

  useEffect(() => {
    if (daoId) {
      // daoが存在しているか確認
      getUserIdToken().then((idToken) => {
        const headers = {
          Authorization: `Bearer ${idToken}`,
        }
        apiClient.post("/getDaoInfo", { daoId: daoId }, headers).then((res) => {
          if (!res) {
            router.push("/create-dao")
            return
          }
        })
      })
    }
  }, [daoId, router])
}
