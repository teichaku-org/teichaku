import { PollEndInfo } from "@/components/poll/PollEndInfo";
import { PollSystem } from "@/components/poll/PollSystem";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";
import { useDaoLoad } from "@/hooks/dao/useDaoLoad";
import useDaoToken from "@/hooks/dao/useDaoToken";
import usePoll from "@/hooks/dao/usePoll";
import useMetaMask from "@/hooks/web3/useMetaMask";
import { useLocale } from "@/i18n/useLocale";
import { Center, Container, Loader, Text, Title } from "@mantine/core";
import { defaultProps } from "@nivo/bar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Poll = () => {
  useDaoExistCheck();
  useDaoLoad();
  const { address } = useMetaMask();
  const { t } = useLocale();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const dao = { daoId: daoId as string, projectId: projectId as string };
  const {
    isAdmin,
    checkIsAdmin,
    pollDetail,
    contractAddress,
    contributorReward,
    vote,
    candidateToPoll,
    loadCurrentMaxPoll,
    settleCurrentPollAndCreateNewPoll,
    voterReward,
    commissionFee,
  } = usePoll(dao);

  const { tokenSymbol } = useDaoToken(dao);
  const { treasuryBalance } = useDaoToken(dao);
  const isTokenShort = treasuryBalance < contributorReward + voterReward + commissionFee;

  useEffect(() => {
    loadCurrentMaxPoll();
  }, [contractAddress]);

  useEffect(() => {
    if (address) checkIsAdmin();
  }, [address]);

  if (!pollDetail)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    );
  const voters = pollDetail.voters;
  const candidates = pollDetail.contributions;
  const incentiveForVoters = Math.round(voterReward / (voters.length + 1));

  const _vote = async (points: number[][], comments: string[]) => {
    if (!vote) return;
    const candidates = pollDetail.contributions.map((c) => c.contributor);
    await vote(pollDetail.pollId, candidates, points, comments);
  };

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    if (!candidateToPoll) return;
    await candidateToPoll(contributionText, evidences, roles);
  };

  const _settle = async () => {
    // トークンがない場合はトークン振込ページへ
    if (isTokenShort) {
      router.push(`/${daoId}/${projectId}/settings/send-token`);
      return;
    }
    await settleCurrentPollAndCreateNewPoll();
  };

  if (!pollDetail)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    );
  return (
    <Container>
      <Center>
        <Title size="h1">{t.Poll.Title}</Title>
      </Center>

      <PollEndInfo
        startDate={pollDetail.startTimeStamp}
        endDate={pollDetail.endTimeStamp}
        settle={_settle} />
      <Text>
        {t.Poll.CurrentReviewerIncentive}{" "}
        <b>
          {incentiveForVoters} {tokenSymbol}
        </b>
      </Text>
      <div style={{ height: 10 }} />
      <PollSystem
        candidates={candidates}
        alreadyVoted={pollDetail.alreadyVoted}
        contributorReward={contributorReward}
        vote={_vote}
        perspectives={pollDetail.perspectives}
        candidateToPoll={_candidateToPoll}
        isAdmin={isAdmin}
        voters={voters}
        settle={_settle}
        tokenSymbol={tokenSymbol}
      />
    </Container>
  );
};
export default Poll;
