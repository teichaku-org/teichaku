import { AppInfo } from "@/constants/AppInfo"
import { CreateDAOFirstProject, CreateDAOName, CreateDAORewardTokenAddress, CreateDAORewardTokenContributorAmount, CreateDAORewardTokenReviewerAmount, CreateDAOSprintDuration } from "@/domains/atoms/CreateDaoAtom"
import useDynamicERC20 from "@/hooks/dao/useDynamicERC20"
import { useLocale } from "@/i18n/useLocale"
import { snakeCase } from "@/utils/snakeCase"
import { Center, Table, Title } from "@mantine/core"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export const ReviewDaoInfo = () => {
    const { t } = useLocale()
    const [name] = useAtom(CreateDAOName)
    const [projectName] = useAtom(CreateDAOFirstProject)
    const [tokenAddress] = useAtom(CreateDAORewardTokenAddress)
    const [contributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
    const [reviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)
    const [sprintDuration] = useAtom(CreateDAOSprintDuration)
    const { loadTokenSymbol, loadTokenName } = useDynamicERC20()

    const [tokenSymbol, setTokenSymbol] = useState(t.CreateDao.Step2.NotSet);
    const [tokenName, setTokenName] = useState(t.CreateDao.Step2.NotSet);

    useEffect(() => {
        if (ethers.utils.isAddress(tokenAddress)) {
            const symbol = loadTokenSymbol(tokenAddress).then((symbol) => {
                setTokenSymbol(symbol)
            })
            const name = loadTokenName(tokenAddress).then((name) => {
                setTokenName(name)
            })
        } else {
            setTokenSymbol(t.CreateDao.Step2.NotSet)
        }
    }, [tokenAddress])


    const snakedName = snakeCase(name);
    const snakedProjectName = snakeCase(projectName);
    const urlPath = "/" + snakedName + "/" + snakedProjectName;
    return <div>
        <Center mb="xl">
            <Title size="h1">
                {t.CreateDao.Step3.Title}
            </Title>
        </Center>

        <Table horizontalSpacing="md" verticalSpacing="sm" fontSize="lg">
            <thead>
                <tr>
                    <th>{t.CreateDao.Step3.Setting}</th>
                    <th>{t.CreateDao.Step3.Value}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{t.CreateDao.Step3.ProjectUrl}</td>
                    <td>{AppInfo.url}<b>{urlPath}</b></td>
                </tr>

                <tr>
                    <td>{t.Settings.TokenSetting.TokenDistribution}</td>
                    <td>{tokenName} (<b>{tokenSymbol}</b>)</td>
                </tr>

                <tr>
                    <td>{t.CreateDao.Step3.ContributorReward}</td>
                    <td>{contributorReward || 0} <b>{tokenSymbol}</b></td>
                </tr>

                <tr>
                    <td>{t.CreateDao.Step3.ReviewerReward}</td>
                    <td>{reviewerReward || 0} <b>{tokenSymbol}</b></td>
                </tr>

                <tr>
                    <td>{t.Settings.PollDuration.Title}</td>
                    <td>{sprintDuration} {t.Settings.PollDuration.DayUnit}</td>
                </tr>


            </tbody>
        </Table>


    </div>
}