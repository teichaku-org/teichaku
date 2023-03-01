import { ContributorRewardAtom, VoterRewardAtom } from "@/domains/atoms/PollDetailAtom"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { Button, Card, NumberInput, Paper, Text, TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

export const DistributionSetting = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { setTokenDistribution } = usePoll({ daoId: daoId as string, projectId: projectId as string }, props.isWeb3)
  const { Contributor, Reviewer } = t.Settings.DistributionSetting
  const [contributorReward, setContributorReward] = useAtom(ContributorRewardAtom)
  const [reviewerReward, setReviewerReward] = useAtom(VoterRewardAtom)

  const onClick = () => {
    if (contributorReward === undefined || reviewerReward === undefined) return
    setTokenDistribution(contributorReward, reviewerReward)
  }

  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.DistributionSetting.Title}
      </Text>

      <NumberInput
        min={0}
        value={contributorReward}
        onChange={(e: number) => setContributorReward(e)}
        placeholder="7000"
        label={t.Settings.DistributionSetting.Contributor.Label}
        mb="sm"
      />
      <NumberInput
        min={0}
        value={reviewerReward}
        onChange={(e: number) => setReviewerReward(e)}
        placeholder="3000"
        label={Reviewer.Label}
        mb="sm"
      />
      <Button onClick={onClick}>{t.Button.Update}</Button>
    </Paper>
  )
}
