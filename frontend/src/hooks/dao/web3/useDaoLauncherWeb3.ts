import { Links } from "@/constants/Links"
import { useLocale } from "@/i18n/useLocale"
import { DAOLauncher } from "@/types/DAOLauncher"
import { hideNotification, showNotification } from "@mantine/notifications"
import { Contract, ethers } from "ethers"
import { useRouter } from "next/router"
import { useState } from "react"
import artifact from "../../../abi/DAOLauncher.sol/DAOLauncher.json"
import { getContract, getContractWithSigner } from "../../web3/useMetaMask"
import { useDaoLauncherInterface } from "../interface/useDaoLauncherInterface"

const useDaoLauncherWeb3: useDaoLauncherInterface = () => {
  const router = useRouter()
  const { t } = useLocale()
  const contractAddress = process.env.NEXT_PUBLIC_DAOLAUNCHER_CONTRACT_ADDRESS as string
  const contract = getContract(contractAddress, artifact.abi) as DAOLauncher
  const contractWithSigner = getContractWithSigner(contractAddress, artifact.abi) as DAOLauncher

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
    votingDurattion: number
  ) => {
    const tx = await contractWithSigner.functions.createDao(
      daoId,
      projectId,
      daoName,
      daoDescription,
      website,
      logo,
      tokenAddress,
      ethers.utils.parseEther(String(contributorReward)),
      ethers.utils.parseEther(String(reviewerReward)),
      votingDurattion * 60 * 60 * 24
    )
    showNotification({
      id: "createDao",
      title: t.CreateDao.Complete.Notification.Title,
      message: t.CreateDao.Complete.Notification.Message,
      loading: true,
      autoClose: false,
    })
    await tx.wait()
    const commonPath = Links.getCommonPath(router)
    router.push(`/${commonPath}/overview`)
    hideNotification("createDao")
  }

  return {
    createDao,
  }
}

export default useDaoLauncherWeb3
