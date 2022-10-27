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
  const { isAdmin, checkIsAdmin, pollDetail, contractAddress, contributorReward, vote, candidateToPoll, loadCurrentMaxPoll, settleCurrentPollAndCreateNewPoll } =
    usePoll({ daoId: daoId as string, projectId: projectId as string });
  const { tokenSymbol } = useDaoToken({ daoId: daoId as string, projectId: projectId as string });
  const [leftTimeStr, setLeftTimeStr] = useState("");

  useEffect(() => {
    console.log({ contractAddress })
    loadCurrentMaxPoll();
  }, [contractAddress])

  useEffect(() => {
    if (address) checkIsAdmin()
  }, [address])


  const interval = useInterval(() => {
    if (endTimeStamp) setLeftTimeStr(getLeftTime(endTimeStamp));
  }, 1000);
  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [pollDetail]);
  if (!pollDetail) return <div>Loading</div>;
  const voters = pollDetail.voters;
  const candidates = pollDetail.contributions;
  const startTimeStamp = pollDetail.startTimeStamp;
  const endTimeStamp = pollDetail.endTimeStamp;

  const _vote = async (points: number[][], comments: string[]) => {
    if (!vote) return;
    const candidates = pollDetail.contributions.map((c) => c.contributor);
    console.log({ points, comments, candidates });
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
        <Title size="h1">Contribution Poll</Title>
      </Center>

      <Text mb="lg">
        This poll end in{"  "}
        <Text
          size="xl"
          span
          variant="gradient"
          gradient={{ from: "blue", to: "grape" }}
        >
          {leftTimeStr}
        </Text>
      </Text>
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
