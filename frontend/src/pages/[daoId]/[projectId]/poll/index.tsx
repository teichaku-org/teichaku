import { PollEndInfo } from "@/components/poll/PollEndInfo";
import { PollSystem } from "@/components/poll/PollSystem";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";
import { useDaoLoad } from "@/hooks/dao/useDaoLoad";
import useDaoToken from "@/hooks/dao/useDaoToken";
import usePoll from "@/hooks/dao/usePoll";
import useMetaMask from "@/hooks/web3/useMetaMask";
import { getLeftTime } from "@/utils/calculateLeftTime";
import { Center, Container, Text, Title } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Poll = () => {
  useDaoExistCheck()
  useDaoLoad()
  const { address } = useMetaMask()
  const router = useRouter()
  const { daoId, projectId } = router.query
  const { isAdmin, checkIsAdmin, pollDetail,
    contractAddress, contributorReward, vote, candidateToPoll,
    loadCurrentMaxPoll, settleCurrentPollAndCreateNewPoll,
    voterReward } =
    usePoll({ daoId: daoId as string, projectId: projectId as string });
  const { tokenSymbol } = useDaoToken({ daoId: daoId as string, projectId: projectId as string });

  useEffect(() => {
    loadCurrentMaxPoll();
  }, [contractAddress])

  useEffect(() => {
    if (address) checkIsAdmin()
  }, [address])



  if (!pollDetail) return <div>Loading</div>;
  const voters = pollDetail.voters;
  const candidates = pollDetail.contributions;
  const incentiveForVoters = Math.round(voterReward / (voters.length + 1))

  const _vote = async (points: number[][], comments: string[]) => {
    if (!vote) return;
    const candidates = pollDetail.contributions.map((c) => c.contributor);
    await vote(pollDetail.pollId, candidates, points, comments);
  };

  const _candidateToPoll = async (
    contributionText: string,
    evidences: string[],
    roles: string[]
  ) => {
    if (!candidateToPoll) return;
    await candidateToPoll(contributionText, evidences, roles);
  };

  const _settle = async () => {
    if (!settleCurrentPollAndCreateNewPoll) return;
    await settleCurrentPollAndCreateNewPoll();
  };

  if (!pollDetail) return <div>Loading</div>;
  return (
    <Container>

      <Center>
        <Title size="h1">SprintReview</Title>
      </Center>

      <PollEndInfo
        startDate={pollDetail.startTimeStamp}
        endDate={pollDetail.endTimeStamp} />
      <Text>Current Reviewer Incentive: <b>{incentiveForVoters} {tokenSymbol}</b></Text>
      <div style={{ height: 10 }} />
      <PollSystem
        candidates={candidates}
        alreadyVoted={pollDetail.alreadyVoted}
        contributorReward={contributorReward}
        vote={_vote}
        perspectives={pollDetail.perspectives}
        candidateToPoll={_candidateToPoll}
        isAdmin={isAdmin}
        settle={_settle}
        tokenSymbol={tokenSymbol}
      />
    </Container>
  );
};
export default Poll;
