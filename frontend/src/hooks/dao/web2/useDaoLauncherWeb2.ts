import { useLocale } from "@/i18n/useLocale"
import { useRouter } from "next/router"
import { useDaoLauncherInterface } from "../interface/useDaoLauncherInterface"
import { hideNotification, showNotification } from "@mantine/notifications"
import { APIClient } from "@/utils/APIClient"
import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { Links } from "@/constants/Links"

const useDaoLauncherWeb2: useDaoLauncherInterface = () => {
  const router = useRouter()
  const { t } = useLocale()
  const apiClient = new APIClient()
  const { getUserIdToken } = useWeb3Auth()
  const createDao = async (
    daoId: string,
    projectId: string,
    daoName: string,
    daoDescription: string,
    website: string,
    logo: string,
    tokenAddress: string,
    contributorReward: number,
    reviewerReward: number,
    votingDuration: number
  ) => {
    const idToken = await getUserIdToken()
    if (!idToken) {
      window.alert("Please login first.")
      return
    }
    const headers = {
      Authorization: `Bearer ${idToken}`,
    }

    showNotification({
      id: "createDao",
      title: t.CreateDao.CompleteWeb2.Notification.Title,
      message: t.CreateDao.CompleteWeb2.Notification.Message,
      loading: true,
      autoClose: false,
    })

    await apiClient.post(
      "/createDao",
      {
        daoId: daoId,
        projectId: projectId,
        name: daoName,
        description: daoDescription,
        website: website,
        logo: logo,
        tokenAddress: tokenAddress,
        contributorReward,
        reviewerReward,
        votingDuration: votingDuration * 60 * 60 * 24 * 1000,
      },
      headers
    )

    router.push(`/web2/${daoId}/${projectId}/overview`)
    hideNotification("createDao")
  }

  return {
    createDao,
  }
}

export default useDaoLauncherWeb2
