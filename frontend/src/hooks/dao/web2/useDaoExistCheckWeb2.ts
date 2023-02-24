import { useRouter } from "next/router"
import { useDaoExistCheckInterface } from "../interface/useDaoExistCheckInterface"
import { useEffect } from "react"
import { APIClient } from "@/types/APIClient"

export const useDaoExistCheckWeb2: useDaoExistCheckInterface = () => {
  const router = useRouter()
  const { daoId, projectId } = router.query
  const apiClient = new APIClient()

  useEffect(() => {
    if (daoId) {
      // daoが存在しているか確認
      apiClient.post("/getDaoInfo", { daoId: daoId }).then((res) => {
        if (!res) {
          router.push("/create-dao")
          return
        }
      })
    }
  }, [daoId, router])
}
