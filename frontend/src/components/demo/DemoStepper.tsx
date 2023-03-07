import { Links } from "@/constants/Links"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { Stack, Text, Paper, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { StepCard } from "./StepCard"

interface Props {
  isWeb3: boolean
}

export const DemoStepper = (props: Props) => {
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  const dao = { daoId: daoId as string, projectId: projectId as string }
  const { pollDetail, setStartTime, setDuration } = usePoll(dao, props.isWeb3)
  const commonPath = Links.getCommonPath(router)
  const apiClient = new APIClient()
  const data = [
    {
      title: t.DemoStepper.Step1,
      onClick: () => {
        router.push(commonPath + "/contribution")
      },
    },
    {
      title: t.DemoStepper.Step2,
      onClick: async () => {
        //投票を行える日付にする
        if (pollDetail) {
          const weekAgo = new Date()
          const pollDuration = 7
          weekAgo.setDate(weekAgo.getDate() - 7)

          await setStartTime(pollDetail.pollId, weekAgo.getTime() / 1000)
          await setDuration(pollDetail.pollId, pollDuration)
        }

        //デモデータを作成する
        await apiClient.post("/createCandidateDemoData", { daoId: daoId as string, projectId: projectId as string })
        router.push(commonPath + "/poll")
      },
    },
    {
      title: t.DemoStepper.Step3,
      onClick: () => {
        router.push(commonPath + "/poll")
      },
    },
    {
      title: t.DemoStepper.Step4,
      onClick: () => {
        router.push(commonPath + "/settings")
      },
    },
  ]

  const renderStepCards = () => {
    return data.map((item, index) => {
      return <StepCard key={item.title} title={item.title} onClick={item.onClick} />
    })
  }

  return (
    <>
      <Title align="center" mb="md">
        {t.DemoStepper.Title}
      </Title>
      <Stack mb="xl" sx={(theme) => ({ backgroundColor: theme.colors.dark[8] })}>
        {renderStepCards()}
      </Stack>
    </>
  )
}
