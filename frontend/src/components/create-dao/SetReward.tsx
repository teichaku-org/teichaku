import {
  CreateDAOPerspectives,
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
  const [perspectives, setPerspectives] = useAtom(CreateDAOPerspectives)
  const [contributorReward, setContributorReward] = useAtom(CreateDAORewardTokenContributorAmount)
  const [reviewerReward, setReviewerReward] = useAtom(CreateDAORewardTokenReviewerAmount)
  const [sprintDuration, setSprintDuration] = useAtom(CreateDAOSprintDuration)
  const { Perspective } = t.Settings.PollPerspectiveSetting
  const form = useForm({
    initialValues: {
      perspective1: perspectives[0] ? perspectives[0] : "量",
      perspective2: perspectives[1] ? perspectives[1] : "質",
      perspective3: perspectives[2] ? perspectives[2] : "有効性",
    },
  })
  const update = () => {
    const result = [form.values.perspective1, form.values.perspective2, form.values.perspective3]
    const perspectives = result.filter((item) => item !== "" && item !== undefined)
    setPerspectives(perspectives)
  }

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

  const Web2Setting = () => {
    return (
      <>
        <Text size="md" weight={700}>
          {t.Settings.PollPerspectiveSetting.Title}
        </Text>

        <TextInput
          label={Perspective.Label(1)}
          placeholder={Perspective.InitialValues.Perspective1}
          name="perspective1"
          variant="filled"
          {...form.getInputProps("perspective1")}
          onChange={(e) =>
            form.setValues({
              perspective1: e.currentTarget.value,
            })
          }
        />

        <TextInput
          label={Perspective.Label(2)}
          placeholder={Perspective.InitialValues.Perspective2}
          mt="md"
          name="perspective2"
          variant="filled"
          {...form.getInputProps("perspective2")}
          onChange={(e) =>
            form.setValues({
              perspective2: e.currentTarget.value,
            })
          }
        />

        <TextInput
          label={Perspective.Label(3)}
          placeholder={Perspective.InitialValues.Perspective3}
          mt="md"
          name="perspective3"
          variant="filled"
          {...form.getInputProps("perspective3")}
          onChange={(e) =>
            form.setValues({
              perspective3: e.currentTarget.value,
            })
          }
        />
      </>
    )
  }

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

  useEffect(() => {
    return () => update()
  }, [])

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
        />
      </Card>
    </div>
  )
}
