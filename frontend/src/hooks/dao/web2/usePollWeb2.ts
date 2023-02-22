import { hideNotification, showNotification } from "@mantine/notifications";
import { usePollInterface } from "../interface/usePollInterface";
import { useRouter } from "next/router";
import { Links } from "@/constants/Links";
import { useLocale } from "@/i18n/useLocale";
import { APIClient } from "@/types/APIClient";
import { useAtom } from "jotai";
import { PollDetailAtom } from "@/domains/atoms/PollDetailAtom";
import { Contribution } from "@/domains/Contribution";
import { PollDetail } from "@/domains/PollDetail";
import { useEffect } from "react";

const usePollWeb2: usePollInterface = (props: { daoId: string; projectId: string }) => {
  const router = useRouter();
  const { t } = useLocale();
  const contractAddress = "";
  const isAdmin = false;
  const [pollDetail, setPollDetail] = useAtom(PollDetailAtom);
  const contributorReward = 0;
  const voterReward = 0;
  const commissionFee = 0;
  const apiClient = new APIClient();

  const checkIsAdmin = async () => {};

  useEffect(() => {
    _loadCurrentMaxPoll();
  }, []);

  const _loadCurrentMaxPoll = async () => {
    _fetchPollDetail().then((res) => {
      if (res) {
        setPollDetail(res);
      }
    });
  };

  const loadCurrentMaxPoll = () => {};

  const _vote = async (pollId: number, candidates: string[], points: number[][], comments: string[]) => {
    throw new Error("Not implemented");
  };

  const settleCurrentPollAndCreateNewPoll = async () => {
    throw new Error("Not implemented");
  };

  const _fetchPollDetail = async (): Promise<PollDetail | null> => {
    const res = await apiClient.post("/getPollDetail", {
      daoId: props.daoId,
      projectId: props.projectId,
    });
    let _pollDetail: PollDetail | null = null;

    if (res) {
      _pollDetail = {
        pollId: res.data.pollId,
        contributions: res.data.contributions,
        voters: res.data.voters,
        alreadyVoted: res.data.voters.includes("myUserId"),
        alreadyContributed: res.data.contributions.map((c: Contribution) => c.contributor).includes("myUserId"),
        startTimeStamp: new Date(res.data.startTime._seconds * 1000),
        endTimeStamp: new Date(res.data.endTime._seconds * 1000),
        perspectives: res.data.perspectives,
      };
    }
    console.log(_pollDetail);
    return _pollDetail;
  };

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    showNotification({
      id: "candidate",
      title: t.Contribution.ContributionCard.Notification.Title,
      message: t.Contribution.ContributionCard.Notification.Message,
      loading: true,
      autoClose: false,
    });

    await apiClient.post("/candidateToCurrentPoll", {
      daoId: props.daoId,
      contributionText: contributionText,
      evidences: evidences,
      roles: roles,
      contributor: "myUserId",
      pollId: props.daoId,
    });

    hideNotification("candidate");
    const commonPath = Links.getCommonPath(router);
    router.push(commonPath + "/poll");
  };

  const _setTokenAddress = async (_daoTokenAddress: string | null, _nftAddress: string | null) => {};

  const _setStartTime = async (pollId: number, startTimeStamp: number) => {};

  const _setDuration = async (pollId: number, durationDays: number) => {};

  const _setPerspectives = async (perspectives: string[]) => {};

  const _setTokenDistribution = async (contributorReward: number, voterReward: number) => {};

  return {
    contractAddress,
    isAdmin,
    checkIsAdmin,
    pollDetail,
    loadCurrentMaxPoll,
    contributorReward,
    voterReward,
    commissionFee,
    vote: _vote,
    settleCurrentPollAndCreateNewPoll,
    candidateToPoll: _candidateToPoll,
    setTokenAddress: _setTokenAddress,
    setStartTime: _setStartTime,
    setDuration: _setDuration,
    setPerspectives: _setPerspectives,
    setTokenDistribution: _setTokenDistribution,
  };
};

export default usePollWeb2;
