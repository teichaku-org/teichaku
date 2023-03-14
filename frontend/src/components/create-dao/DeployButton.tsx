import {
  CreateDAOName,
  CreateDAOFirstProject,
  CreateDAODescription,
  CreateDAOAvatar,
  CreateDAORewardTokenAddress,
  CreateDAORewardTokenContributorAmount,
  CreateDAORewardTokenReviewerAmount,
  CreateDAOSprintDuration,
} from "@/domains/atoms/CreateDaoAtom"
import useDaoLauncher from "@/hooks/dao/useDaoLauncher"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { snakeCase } from "@/utils/snakeCase"
import { Stack, Center, Loader, Button, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useState } from "react"

interface Props {
  isWeb3: boolean
}
export const DeployButton = (props: Props) => {
  const { t } = useLocale()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { createDao } = useDaoLauncher(props.isWeb3)
  const [name] = useAtom(CreateDAOName)
  const [projectName] = useAtom(CreateDAOFirstProject)
  const [description] = useAtom(CreateDAODescription)
  const [avator] = useAtom(CreateDAOAvatar)
  const [tokenAddress] = useAtom(CreateDAORewardTokenAddress)
  const [contributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
  const [reviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)
  const [sprintDuration] = useAtom(CreateDAOSprintDuration)

  const daoId = snakeCase(name)
  const projectId = snakeCase(projectName)

  const _createDao = async () => {
    setErrorMessage("")
    setLoading(true)
    try {
      await createDao(
        daoId,
        projectId,
        name,
        description,
        "https://...",
        avator,
        tokenAddress,
        contributorReward || 0,
        reviewerReward || 0,
        sprintDuration || 7
      )

      setLoading(false)
    } catch (err: any) {
      //必要に応じてRetry
      setErrorMessage(err.message)
    }
  }

  return (
    <Stack>
      <Center>{loading && <Loader color="violet" size="xl" />}</Center>
      <>
        <Center>
          <Text>{props.isWeb3 ? t.CreateDao.Complete.Wait : t.CreateDao.CompleteWeb2.Wait}</Text>
        </Center>
        <Center>
          <Text color="red">{errorMessage}</Text>
        </Center>
        {errorMessage ? (
          <Center>
            <Button size="xl" variant="gradient" gradient={{ deg: 0, from: "blue", to: "grape" }} onClick={_createDao}>
              {props.isWeb3 ? t.CreateDao.Complete.Retry : t.CreateDao.CompleteWeb2.Retry}
            </Button>
          </Center>
        ) : (
          <Center>
            <Button size="xl" variant="gradient" gradient={{ deg: 0, from: "blue", to: "grape" }} onClick={_createDao}>
              {props.isWeb3 ? t.CreateDao.Complete.AcceptTransaction : t.CreateDao.CompleteWeb2.AcceptTransaction}
            </Button>
          </Center>
        )}
      </>
    </Stack>
  )
}
