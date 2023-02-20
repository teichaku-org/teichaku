import { CreateDAORewardTokenAddress, CreateDAORewardTokenContributorAmount, CreateDAORewardTokenReviewerAmount, CreateDAOSprintDuration } from "@/domains/atoms/CreateDaoAtom";
import useDynamicERC20 from "@/hooks/dao/useDynamicERC20";
import { useLocale } from "@/i18n/useLocale";
import { Card, Center, NumberInput, Space, Text, TextInput, Title } from "@mantine/core";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface Props {
    pollInfoDefault?: {
        durationDay: number,
        voterReward: number,
        contributorReward: number,
    }
}

export const SetReward = (props: Props) => {
    const { t } = useLocale();
    const [tokenSymbol, setTokenSymbol] = useState(t.CreateDao.Step2.NotSet);
    const [tokenAddress, setTokenAddress] = useAtom(CreateDAORewardTokenAddress)
    const [contributorReward, setContributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
    const [reviewerReward, setReviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)
    const [sprintDuration, setSprintDuration] = useAtom(CreateDAOSprintDuration)
    const { loadTokenSymbol } = useDynamicERC20()

    useEffect(() => {
        //props.pollInfoDefaultが存在する場合は、初期値をセットする
        if (!props.pollInfoDefault) return
        setContributorReward(props.pollInfoDefault.contributorReward)
        setReviewerReward(props.pollInfoDefault.voterReward)
        setSprintDuration(props.pollInfoDefault.durationDay)
    }, [props.pollInfoDefault])

    const onChangeTokenAddress = async (address: string) => {
        setTokenAddress(address);
        if (ethers.utils.isAddress(address)) {
            const symbol = await loadTokenSymbol(address)
            setTokenSymbol(symbol)
        } else {
            setTokenSymbol(t.CreateDao.Step2.NotSet)
        }
    }

    const isTokenAddressYetEmpty = tokenAddress === ""
    const invalidTokenAddress = !ethers.utils.isAddress(tokenAddress)
    const noTokenSymbol = tokenSymbol === t.CreateDao.Step2.NotSet
    const errorMessage = (() => {
        if (isTokenAddressYetEmpty) {
            return ""
        }
        if (invalidTokenAddress) {
            return t.CreateDao.Step2.InvalidTokenAddress
        }
        if (noTokenSymbol) {
            return t.CreateDao.Step2.NoTokenSymbol
        }
    })()

    return <div>
        <Center mb="xl">
            <Title size="h1">
                {t.CreateDao.Step2.Title}
            </Title>
        </Center>


        <Text size="md" weight={700}>
            {t.Settings.TokenSetting.TokenDistribution}
        </Text>
        <Card mb="md">
            {t.Settings.TokenSetting.CurrentTokenSymbol}{" "}
            <Text size="lg" weight={500} mb="md" span>
                {tokenSymbol}
            </Text>
        </Card>
        <TextInput
            value={tokenAddress}
            required
            onChange={(e) => onChangeTokenAddress(e.currentTarget.value)}
            placeholder="0x..."
            error={errorMessage}
            label={t.Settings.TokenSetting.AddressInput.Label}
            mb="sm" />

        <Space h="md" />
        <Text size="md" weight={700}>
            {t.Settings.DistributionSetting.Title}
        </Text>

        <NumberInput
            required
            min={0}
            value={contributorReward}
            onChange={(e) => setContributorReward(e)}
            placeholder="7000" label={t.Settings.DistributionSetting.Contributor.Label} mb="sm" />
        <NumberInput
            required
            min={0}
            value={reviewerReward}
            onChange={(e) => setReviewerReward(e)}
            placeholder="3000" label={t.Settings.DistributionSetting.Reviewer.Label} mb="sm" />

        <Space h="md" />
        <Text size="md" weight={700}>
            {t.Settings.PollDuration.Title}
        </Text>
        <NumberInput
            label={t.Settings.PollDuration.Days}
            defaultValue={7}
            min={1}
            max={30}
            value={sprintDuration}
            onChange={(e) => setSprintDuration(e)}
        />
    </div>
}
