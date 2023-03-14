import {
  CreateDAORewardTokenAddress,
  CreateDAORewardTokenContributorAmount,
  CreateDAORewardTokenReviewerAmount,
  CreateDAOSprintDuration,
} from "@/domains/atoms/CreateDaoAtom"
import useDynamicERC20 from "@/hooks/dao/useDynamicERC20"
import { useLocale } from "@/i18n/useLocale"
import { Card, Center, NumberInput, Space, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconPremiumRights } from "@tabler/icons"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export const SetReward = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const [tokenSymbol, setTokenSymbol] = useState(t.CreateDao.Step2.NotSet)
  const [tokenAddress, setTokenAddress] = useAtom(CreateDAORewardTokenAddress)
  const [contributorReward, setContributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
  const [reviewerReward, setReviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)
  const [sprintDuration, setSprintDuration] = useAtom(CreateDAOSprintDuration)

  const { loadTokenSymbol } = useDynamicERC20(props.isWeb3)

  const onChangeTokenAddress = async (address: string) => {
    setTokenAddress(address)
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

  const Web3Setting = () => {
    return (
      <>
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
          mb="sm"
        />
      </>
    )
  }

  return (
    <div>
      <Card shadow="xl" p="xl" mb="xl" mt={60} bg="black">
        <Center mb="xl">
          <Title size="h1">{t.CreateDao.Step2.Title}</Title>
        </Center>
        {props.isWeb3 && Web3Setting()}
        <Space h="md" />

        <NumberInput
          label={t.Settings.PollDuration.Title2}
          description={t.Settings.PollDuration.Description}
          defaultValue={7}
          min={1}
          max={30}
          value={sprintDuration}
          onChange={(e) => setSprintDuration(e || 0)}
          size="md"
        />
        <Space h="md" />
        {/* 
        <Text size="md" weight={700}>
          {t.Settings.DistributionSetting.Title}
        </Text> */}

        <NumberInput
          required
          min={0}
          value={contributorReward}
          icon={<IconPremiumRights />}
          onChange={(e) => setContributorReward(e || 0)}
          placeholder="7000"
          label={t.Settings.DistributionSetting.Contributor.Label}
          description={t.Settings.DistributionSetting.Contributor.Description}
          size="md"
          mb="sm"
          step={1000}
        />
        <NumberInput
          required
          min={0}
          icon={<IconPremiumRights />}
          value={reviewerReward}
          onChange={(e) => setReviewerReward(e || 0)}
          placeholder="3000"
          label={t.Settings.DistributionSetting.Reviewer.Label}
          description={t.Settings.DistributionSetting.Reviewer.Description}
          size="md"
          mb="sm"
          step={1000}
        />
      </Card>
    </div>
  )
}
