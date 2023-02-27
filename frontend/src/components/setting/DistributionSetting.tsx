import {
  CreateDAORewardTokenContributorAmount,
  CreateDAORewardTokenReviewerAmount,
} from "@/domains/atoms/CreateDaoAtom"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { Button, Card, Paper, Text, TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

export const DistributionSetting = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { setTokenDistribution } = usePoll({ daoId: daoId as string, projectId: projectId as string }, props.isWeb3)
  const { Contributor, Reviewer } = t.Settings.DistributionSetting
  const [contributorReward, setContributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
  const [reviewerReward, setReviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)

  const onClick = () => {
    if (contributorReward === undefined || reviewerReward === undefined) return
    setTokenDistribution(contributorReward, reviewerReward)
  }
  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.DistributionSetting.Title}
      </Text>

      <TextInput
        value={contributorReward}
        onChange={(e) => setContributorReward(Number(e.target.value))}
        placeholder="7000"
        label={Contributor.Label}
        mb="sm"
      />
      <TextInput
        value={reviewerReward}
        onChange={(e) => setReviewerReward(Number(e.target.value))}
        placeholder="3000"
        label={Reviewer.Label}
        mb="sm"
      />
      <Button onClick={onClick}>{t.Button.Update}</Button>
    </Paper>
  )
}
