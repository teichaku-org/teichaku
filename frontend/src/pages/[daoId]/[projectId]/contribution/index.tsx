import { ContributionCard } from "@/components/contribution/ContributionCard";
import { PollEndInfo } from "@/components/poll/PollEndInfo";
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck";
import { useDaoLoad } from "@/hooks/dao/useDaoLoad";
import usePoll from "@/hooks/dao/usePoll";
import { Center, Container, Loader, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Poll = () => {
  useDaoExistCheck();
  useDaoLoad();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const { candidateToPoll, pollDetail, loadCurrentMaxPoll, contractAddress } = usePoll({
    daoId: daoId as string,
    projectId: projectId as string,
  });

  useEffect(() => {
    loadCurrentMaxPoll();
  }, [contractAddress]);

  const _candidateToPoll = async (contributionText: string, evidences: string[], roles: string[]) => {
    if (!candidateToPoll) return;
    await candidateToPoll(contributionText, evidences, roles);
  };

  if (!pollDetail)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    );
  return (
    <Container>
      <Center m="md">
        <Title size="h1">Explain Your Contribution!</Title>
      </Center>
      <PollEndInfo startDate={pollDetail.startTimeStamp} endDate={pollDetail.endTimeStamp} />
      <div style={{ height: 10 }} />
      <ContributionCard candidateToPoll={_candidateToPoll} />
    </Container>
  );
};
export default Poll;
