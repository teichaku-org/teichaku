import { Grid, Paper, ThemeIcon, Title, Text, Stack, Group, Center } from "@mantine/core"

import { AssessmentBar } from "../graphs/AssessmentBar"
import { AssessmentLine } from "../graphs/AssessmentLine"
import { TotalReward } from "./TotalReward"
import { IconArrowUpRight, IconChartBar, IconChartLine, IconCoin } from "@tabler/icons"
import { DaoHistory } from "@/domains/DaoHistory"

import { useEffect, useState } from "react"
import { getContract } from "@/hooks/web3/useMetaMask"
import { Poll } from "@/types"
import artifact from "../../abi/Poll.sol/Poll.json"
import { getRewardHistory } from "@/utils/analysis/getRewardHistory"
import { getCumulativeReward } from "@/utils/analysis/getCumulativeReward"
import { AverageAssessment } from "./AverageAssessment"
import { useAtom } from "jotai"
import { PollContractAddress } from "@/domains/atoms/DaoContractAddressAtom"
import { useLocale } from "@/i18n/useLocale"
import usePoll from "@/hooks/dao/usePoll"
import { useRouter } from "next/router"

interface Props {
  myDaoHistory: DaoHistory[]
  address: string //TODO: myDaoHistoryを渡すかaddressを渡すか統一する
  isWeb3: boolean
}

const TotalTab = (props: Props) => {
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  const { TotalRewardTitle, ComparedPreviousReward, CumulativeRewardTitle, RewardHistoryTitle } =
    t.Assessment.AssessmentTabs.TotalTab
  const { myDaoHistory } = props
  const [currentMaxPollId, setCurrentMaxPollId] = useState<number>(0)
  const [contractAddress] = useAtom(PollContractAddress)
  const { loadCurrentMaxPollId } = usePoll({ daoId: daoId as string, projectId: projectId as string }, props.isWeb3)

  useEffect(() => {
    loadCurrentMaxPollId().then((res: number) => {
      setCurrentMaxPollId(res)
    })
  }, [])

  //NOTE currentMaxPollIdは開催中のpollIdなので過去の最新のものは-1したものになる
  const rewardHistory = getRewardHistory(myDaoHistory, currentMaxPollId - 1)

  const cumulativeReward = getCumulativeReward(rewardHistory)

  const TotalRewardCol = () => {
    const totalReward = myDaoHistory.reduce(function (sum, element) {
      return sum + element.reward
    }, 0)

    const getLatestReward = () => {
      for (let pollId = currentMaxPollId - 1; pollId >= 0; pollId--) {
        const foundDao = myDaoHistory.find((mydao) => mydao.pollId === pollId)
        if (foundDao) {
          return foundDao.reward
        }
      }
      return 0
    }

    const previousTotalReward = totalReward - getLatestReward()
    const upRate = Math.round(((totalReward - previousTotalReward) / totalReward) * 100) || 0
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="violet" mr="xs">
            <IconCoin size={16} stroke={1.5} />
          </ThemeIcon>
          {TotalRewardTitle}
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
          <Stack spacing={0}>
            <TotalReward reward={String(Math.round(totalReward))} />
            <Group>
              <Text size="xs" color="dimmed">
                {ComparedPreviousReward}
              </Text>
              <Center>
                <Text color="teal" size={27} weight={500}>
                  +{upRate}%
                </Text>
                <Text color="teal" mt="xs">
                  <IconArrowUpRight size={27} stroke={1.5} />
                </Text>
              </Center>
            </Group>
          </Stack>
        </Paper>
      </>
    )
  }

  const CumulativeReward = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="blue" mr="xs">
            <IconChartLine size={16} stroke={1.5} />
          </ThemeIcon>
          {CumulativeRewardTitle}
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentLine data={cumulativeReward} />
        </Paper>
      </>
    )
  }

  const RewardHistoryCol = () => {
    return (
      <>
        <Title mt="md" size="h3">
          <ThemeIcon size="md" radius="md" variant="light" color="grape" mr="xs">
            <IconChartBar size={16} stroke={1.5} />
          </ThemeIcon>
          {RewardHistoryTitle}
        </Title>
        <Paper mt="xs" style={{ height: 310 }}>
          <AssessmentBar data={rewardHistory} />
        </Paper>
      </>
    )
  }

  return (
    <Grid>
      <Grid.Col md={12} lg={4}>
        <TotalRewardCol />
      </Grid.Col>
      <Grid.Col md={12} lg={8}>
        <CumulativeReward />
      </Grid.Col>
      <Grid.Col md={12} lg={4}>
        <AverageAssessment address={props.address} />
      </Grid.Col>
      <Grid.Col md={12} lg={8}>
        <RewardHistoryCol />
      </Grid.Col>
    </Grid>
  )
}

export default TotalTab
