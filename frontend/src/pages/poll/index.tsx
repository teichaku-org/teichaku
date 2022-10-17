import { PollSystem } from "@/components/poll/PollSystem";
import usePoll from "@/hooks/dao/usePoll";
import { getLeftTime } from "@/utils/calculateLeftTime";
import { Container, Text } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

const Poll = () => {
  const { pollDetail, voterReward, contributorReward, vote, candidateToPoll } =
    usePoll();
  const [leftTimeStr, setLeftTimeStr] = useState("");
  const interval = useInterval(() => {
    console.log("call");
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
    const candidates = pollDetail.contributions.map((c) => c.contributor);
    console.log({ points, comments, candidates });
    await vote(pollDetail.pollId, candidates, points, comments);
  };

  const _candidateToPoll = async (
    contributionText: string,
    evidences: string[],
    roles: string[]
  ) => {
    await candidateToPoll(contributionText, evidences, roles);
  };

  if (!pollDetail) return <div>Loading</div>;
  //TODO: NFTを持っている場合のみ投票できるようにする
  return (
    <Container>
      <h1>Evaluate the contributions achieved by DAO members this week!</h1>
      <Text mb="lg">
        The poll will end in{" "}
        <Text
          size="xl"
          span
          variant="gradient"
          gradient={{ from: "blue", to: "grape" }}
        >
          {leftTimeStr}
        </Text>
      </Text>
      <Text mb="lg">
        You'll gain preliminary {voterReward / voters.length} Coins just by
        voting!{" "}
      </Text>
      <PollSystem
        candidates={candidates}
        alreadyVoted={pollDetail.alreadyVoted}
        contributorReward={contributorReward}
        vote={_vote}
        perspectives={pollDetail.perspectives}
        candidateToPoll={_candidateToPoll}
      />
    </Container>
  );
};
export default Poll;
