import { useLocale } from "@/i18n/useLocale";
import { useRouter } from "next/router";
import { useDaoLauncherInterface } from "../interface/useDaoLauncherInterface";
import { hideNotification, showNotification } from "@mantine/notifications";
import { APIClient } from "@/types/APIClient";
import { useAtom } from "jotai";
import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";

const useDaoLauncherWeb2: useDaoLauncherInterface = () => {
  const router = useRouter();
  const { t } = useLocale();
  const [isWeb3, setIsWeb3] = useAtom(Web3FlagAtom);
  const apiClient = new APIClient();

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
    showNotification({
      id: "createDao",
      title: t.CreateDao.Complete.Notification.Title,
      message: t.CreateDao.Complete.Notification.Message,
      loading: true,
      autoClose: false,
    });

    await apiClient.post("/createDao", {
      daoId: daoId,
      projectId: projectId,
      name: daoName,
      description: daoDescription,
      website: website,
      logo: logo,
      tokenAddress: tokenAddress,
      contributorReward: contributorReward,
      reviewerReward: reviewerReward,
      votingDuration: votingDurattion,
      isWeb3: isWeb3,
    });

    router.push(`/${daoId}/${projectId}/overview`);
    hideNotification("createDao");
  };

  return {
    createDao,
  };
};

export default useDaoLauncherWeb2;
