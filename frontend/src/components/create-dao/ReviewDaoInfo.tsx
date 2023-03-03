import { AppInfo } from "@/constants/AppInfo"
import {
  CreateDAODescription,
  CreateDAOFirstProject,
  CreateDAOName,
  CreateDAOPerspectives,
  CreateDAORewardTokenAddress,
  CreateDAORewardTokenContributorAmount,
  CreateDAORewardTokenReviewerAmount,
  CreateDAOSprintDuration,
} from "@/domains/atoms/CreateDaoAtom"
import useDynamicERC20 from "@/hooks/dao/useDynamicERC20"
import { useLocale } from "@/i18n/useLocale"
import { snakeCase } from "@/utils/snakeCase"
import { Card, Center, Table, Title } from "@mantine/core"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { DeployButton } from "./DeployButton"

export const ReviewDaoInfo = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const [name] = useAtom(CreateDAOName)
  const [vision] = useAtom(CreateDAODescription)
  const [projectName] = useAtom(CreateDAOFirstProject)
  const [tokenAddress] = useAtom(CreateDAORewardTokenAddress)
  const [contributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
  const [reviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)
  const [sprintDuration] = useAtom(CreateDAOSprintDuration)
  const { loadTokenSymbol, loadTokenName } = useDynamicERC20(props.isWeb3)
  const [perspective] = useAtom(CreateDAOPerspectives)

  const [tokenSymbol, setTokenSymbol] = useState("pt")
  const [tokenName, setTokenName] = useState("Point")

  useEffect(() => {
    if (ethers.utils.isAddress(tokenAddress)) {
      loadTokenSymbol(tokenAddress).then((symbol) => {
        setTokenSymbol(symbol)
      })
      loadTokenName(tokenAddress).then((name) => {
        setTokenName(name)
      })
    }
  }, [tokenAddress])

  const snakedName = snakeCase(name)
  const snakedProjectName = snakeCase(projectName)
  const urlPath = "/" + snakedName + "/" + snakedProjectName
  return (
    <div>
      <Card shadow="xl" p="xl" mb="xl" mt={60} bg="black" style={{ overflow: "scroll" }}>
        <Center mb="xl">
          <Title size="h1">{t.CreateDao.Step3.Title}</Title>
        </Center>

        <Table horizontalSpacing="md" verticalSpacing="sm" fontSize="lg">
          <thead>
            <tr>
              <th style={{ minWidth: 250 }}>{t.CreateDao.Step3.Setting}</th>
              <th style={{ minWidth: 250 }}>{t.CreateDao.Step3.Value}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t.CreateDao.Step1.DAOName}</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>{t.CreateDao.Step1.DAOVision}</td>
              <td>{vision}</td>
            </tr>

            <tr>
              <td>{t.CreateDao.Step3.ContributorReward}</td>
              <td>
                {contributorReward || 0} <b>{tokenSymbol}</b>
              </td>
            </tr>

            <tr>
              <td>{t.CreateDao.Step3.ReviewerReward}</td>
              <td>
                {reviewerReward || 0} <b>{tokenSymbol}</b>
              </td>
            </tr>

            <tr>
              <td>{t.Settings.PollDuration.Title}</td>
              <td>
                {sprintDuration} {t.Settings.PollDuration.DayUnit}
              </td>
            </tr>
          </tbody>
        </Table>

        <DeployButton isWeb3={props.isWeb3} />
      </Card>
    </div>
  )
}
