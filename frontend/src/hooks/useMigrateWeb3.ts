import { useRouter } from "next/router"
import { useEffect } from "react"
import { APIClient } from "@/utils/APIClient"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import useMetaMask from "./web3/useMetaMask"

export const useMigrateWeb3 = () => {
  const router = useRouter()
  const { daoId, projectId } = router.query
  const { getUserIdToken } = useWeb3Auth()
  const apiClient = new APIClient()
  const { address, login: loginMetamask } = useMetaMask(true)
  const { login } = useWeb3Auth()

  const migrateDao = async () => {
    const idToken = await getUserIdToken()
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    const res = await apiClient.post(
      "/migrateDao",
      {
        daoId: daoId,
      },
      headers
    )
    return res
  }

  const getTokenReceiveRights = async () => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    try {
      const res = await apiClient.post(
        "/getTokenReceiveRights",
        {
          daoId: daoId,
        },
        headers
      )
      const { token } = res?.data
      if (token) {
        return token
      }
    } catch (e) {
      console.log(e)
    }
    return null
  }

  const registerWallet = async () => {
    //ログインも必要だしMetamaskも必要
    const idToken = await getUserIdToken()
    if (!idToken) {
      //window.alert("Please login first.")
      await login()
      return
    }
    if (!address) {
      await loginMetamask()
      return
    }

    const headers = {
      Authorization: `Bearer ${idToken}`,
    }
    const res = await apiClient.post(
      "/getTokenReceiveRights",
      {
        daoId: daoId,
        walletAddress: address,
      },
      headers
    )
    return res
  }

  return {
    migrateDao,
    getTokenReceiveRights,
    registerWallet,
  }
}
