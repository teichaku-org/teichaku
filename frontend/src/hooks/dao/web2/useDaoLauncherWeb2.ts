import { useLocale } from "@/i18n/useLocale";
import { useRouter } from "next/router";
import { useDaoLauncherInterface } from "../interface/useDaoLauncherInterface";
import { hideNotification, showNotification } from "@mantine/notifications";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { APIClient } from "@/types/APIClient";

const useDaoLauncherWeb2: useDaoLauncherInterface = () => {
  const router = useRouter();
  const { t } = useLocale();
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

    await apiClient.post("/addDao", {
      daoId: daoId,
      projectId: projectId,
      daoName: daoName,
      daoDescription: daoDescription,
      website: website,
      logo: logo,
      tokenAddress: tokenAddress,
      contributorReward: contributorReward,
      reviewerReward: reviewerReward,
      votingDurattion: votingDurattion,
    });

    router.push(`/${daoId}/${projectId}/overview`);
    hideNotification("createDao");
  };

  return {
    createDao,
  };
};

export default useDaoLauncherWeb2;
