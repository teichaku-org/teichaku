import { Grid, Paper, ThemeIcon, Title } from "@mantine/core";

import { AssessmentBar } from "../graphs/AssessmentBar";
import { RewardHistory } from "../graphs/barTestData";
import { AssessmentLine } from "../graphs/AssessmentLine";
import { data } from "../graphs/lineTestData";
import { AssessmentRadar } from "../graphs/AssessmentRadar";
import { TotalReward } from "./TotalReward";
import { IconChartBar, IconChartLine, IconChartRadar, IconCoin } from "@tabler/icons";
import { DaoHistory } from "@/domains/DaoHistory";
import { Assessment } from "@/domains/Assessment";
import { getAverageAssessment } from "@/utils/analysis/getAverageAssessment";
import { useEffect, useState } from "react";
import usePoll from "@/hooks/dao/usePoll";
import { getContract } from "@/hooks/web3/useMetaMask";
import { Poll } from "@/types";
import artifact from "../../abi/Poll.sol/Poll.json";
import { getRewardHistory } from "@/utils/analysis/getRewardHistory";
import { getCumulativeReward } from "@/utils/analysis/getCumulativeReward";
import { Serie } from "@nivo/line";

interface Props {
  myDaoHistory: DaoHistory[];
  assessments: Assessment[];
  address: string;
}

const TotalTab = (props: Props) => {
  const { myDaoHistory, assessments, address } = props;
  const { fetchPollDetail } = usePoll();
  const [perspectives, setPerspectives] = useState<string[]>([]);
  const [currentMaxPollId, setCurrentMaxPollId] = useState<number>(0);

  const loadCurrentMaxPollId = async () => {
    const contractAddress = process.env.NEXT_PUBLIC_POLL_CONTRACT_ADDRESS as string;
    const contract = getContract(contractAddress, artifact.abi) as Poll;
    const currentMaxPollId = await contract.functions.currentMaxPollId();
    console.log(currentMaxPollId[0].toNumber());
    setCurrentMaxPollId(currentMaxPollId[0].toNumber());
  };

  useEffect(() => {
    //NOTE pollIdごとにperspectivesが変わるが一旦これで良い
    fetchPollDetail(myDaoHistory[0].pollId).then((res) => {
      setPerspectives(res.perspectives);
    });
    loadCurrentMaxPollId();
  }, []);

  //NOTE currentMaxPollIdは開催中のpollIdなので過去の最新のものは-1したものになる
  const rewardHistory = getRewardHistory(myDaoHistory, currentMaxPollId - 1);

  const cumulativeReward = getCumulativeReward(rewardHistory);

  const totalReward = myDaoHistory.reduce(function (sum, element) {
    return sum + element.reward;
  }, 0);

  const averageAccessment = getAverageAssessment(assessments, perspectives, address);

  const TotalRewardCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="violet" mr="xs">
            <IconCoin size={16} stroke={1.5} />
          </ThemeIcon>
          Total Reward
        </Title>
        <Paper
          mt="xs"
          style={{
            height: 310,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TotalReward reward={String(Math.round(totalReward))} />
        </Paper>
      </>
    );
  };

  const CumulativeReward = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="blue" mr="xs">
            <IconChartLine size={16} stroke={1.5} />
          </ThemeIcon>
          Cumulative Reward
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentLine data={cumulativeReward} />
        </Paper>
      </>
    );
  };

  const AverageAssessment = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="green" mr="xs">
            <IconChartRadar size={16} stroke={1.5} />
          </ThemeIcon>
          Average Assessment
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentRadar data={averageAccessment} />
        </Paper>
      </>
    );
  };

  const RewardHistoryCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="grape" mr="xs">
            <IconChartBar size={16} stroke={1.5} />
          </ThemeIcon>
          Reward History
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentBar data={rewardHistory} />
        </Paper>
      </>
    );
  };

  return (
    <Grid>
      <Grid.Col md={12} lg={4}>
        <TotalRewardCol />
      </Grid.Col>
      <Grid.Col md={12} lg={8}>
        <CumulativeReward />
      </Grid.Col>
      <Grid.Col md={12} lg={4}>
        <AverageAssessment />
      </Grid.Col>
      <Grid.Col md={12} lg={8}>
        <RewardHistoryCol />
      </Grid.Col>
    </Grid>
  );
};

export default TotalTab;
