import { Links } from "@/constants/Links";
import useDaoHistory from "@/hooks/dao/useDaoHistory";
import usePoll from "@/hooks/dao/usePoll";
import useMetaMask from "@/hooks/web3/useMetaMask";
import useWeb3Auth from "@/hooks/web3/useWeb3Auth";
import { useLocale } from "@/i18n/useLocale";
import { getSingleAssessment } from "@/utils/analysis/getSingleAssessment";
import { shortenAddress } from "@/utils/shortenAddress";
import { Button, Center, Container, Paper, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AssessmentRadar } from "../graphs/AssessmentRadar";
import { Comments } from "./Comments";
import { EarnedCoin } from "./EarnedCoin";
import { Evidences } from "./Evidences";

interface Props {
  contributor: string;
  pollId: number;
}
export const SingleAssessment = (props: Props) => {
  const { t } = useLocale();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { pollDetail, loadCurrentMaxPoll } = usePoll({ daoId: daoId as string, projectId: projectId as string }, true);
  const { address } = useWeb3Auth();
  const { daoHistory, assessments } = useDaoHistory({ daoId: daoId as string, projectId: projectId as string }, true);
  const perspectives = pollDetail?.perspectives || [];
  useEffect(() => {
    //TODO: pollIdごとに異なるperspectivesを取得したい
    loadCurrentMaxPoll();
  }, []);

  const contribution = daoHistory.find(
    (item) => item.contributor === props.contributor && item.pollId === props.pollId
  );
  const targetAssessments = assessments.filter(
    (item) => item.contributor === props.contributor && item.pollId === props.pollId
  );
  const comments = targetAssessments.map((item) => {
    return {
      comment: item.comment,
      author: item.voter,
      timestamp: contribution?.timestamp || new Date(),
    };
  });
  const evidences = contribution?.evidences;

  const data = getSingleAssessment(assessments, perspectives, props.contributor, props.pollId);
  const isYourContribution = props.contributor === address;
  const link = Links.getCommonPath(router) + "/assessments/" + props.contributor;

  return (
    <div>
      <Text span size="xs">
        by{" "}
        <Link href={link}>
          <Text variant="link" span>
            {shortenAddress(props.contributor)}
          </Text>
        </Link>
      </Text>

      <Text mt="lg" mb="xs" color="dimmed">
        {t.Assessment.SingleAssessment.EarnedTokens}
      </Text>

      <Container>
        <EarnedCoin
          reward={String(Math.round(contribution?.reward || 0))}
          contractAddress={contribution?.rewardToken} />
      </Container>

      <Text mt="lg" mb="xs" color="dimmed">
        {t.Assessment.SingleAssessment.Assessments}
      </Text>
      <Container style={{ height: 330, width: 330 }}>
        <AssessmentRadar data={data} />
      </Container>

      {/* 貢献内容 */}
      <Text mt="lg" mb="xs" color="dimmed">
        {t.Assessment.SingleAssessment.Contribution}
      </Text>
      <Paper p="md" withBorder mb="sm">
        <Text size="md" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
          {contribution?.contributionText}
        </Text>
      </Paper>

      {/* エビデンス */}
      <Text mt="lg" mb="xs" color="dimmed">
        {t.Assessment.SingleAssessment.Evidences}
      </Text>
      <Evidences evidences={evidences || []} />

      {/* 投票者 & コメント */}
      <Text mt="lg" mb="xs" color="dimmed">
        {t.Assessment.SingleAssessment.ReviewersAndComments}
      </Text>
      <Comments comments={comments} pollId={props.pollId} />

      {/* 自分のだったらNFT化 */}
      <Center>
        <Button size="lg" disabled={!isYourContribution} variant="gradient" gradient={{ from: "blue", to: "grape" }}>
          {t.Button.MintNFT}
        </Button>
      </Center>

      <div style={{ height: 300 }} />
    </div>
  );
};
