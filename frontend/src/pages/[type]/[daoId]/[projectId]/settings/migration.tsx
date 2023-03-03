import NetworkCheck from "@/components/web3/common/NetworkCheck"
import { CreateDAORewardTokenAddress } from "@/domains/atoms/CreateDaoAtom"
import useDynamicERC20 from "@/hooks/dao/useDynamicERC20"
import { useDaoExistCheckWeb2 } from "@/hooks/dao/web2/useDaoExistCheckWeb2"
import useDaoHistoryWeb2 from "@/hooks/dao/web2/useDaoHistoryWeb2"
import { useDaoLoadWeb2 } from "@/hooks/dao/web2/useDaoLoadWeb2"
import usePollWeb2 from "@/hooks/dao/web2/usePollWeb2"
import useDaoLauncherWeb3 from "@/hooks/dao/web3/useDaoLauncherWeb3"
import { useMigrateWeb3 } from "@/hooks/useMigrateWeb3"
import { useLocale } from "@/i18n/useLocale"
import { Button, Card, Center, Container, Loader, Stack, Table, Text, TextInput, Title } from "@mantine/core"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useState } from "react"

type props = {
  isWeb3: boolean
}

const Page = ({ isWeb3 }: props) => {
  useDaoExistCheckWeb2(isWeb3)
  useDaoLoadWeb2()

  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  const dao = { daoId: daoId as string, projectId: projectId as string }
  const { contributorReward, voterReward, pollDetail } = usePollWeb2(dao)
  const { migrateDao } = useMigrateWeb3()
  const { createDao } = useDaoLauncherWeb3()
  const { daoInfo } = useDaoHistoryWeb2(dao)
  const { loadTokenSymbol, loadTokenName } = useDynamicERC20(isWeb3)
  const [tokenSymbol, setTokenSymbol] = useState(t.CreateDao.Step2.NotSet)
  const [tokenName, setTokenName] = useState(t.CreateDao.Step2.NotSet)
  const [tokenAddress, setTokenAddress] = useAtom(CreateDAORewardTokenAddress)
  const [loading, setLoading] = useState(false)
  const [deployErrorMessage, setDeployErrorMessage] = useState("")
  const [isSetToken, setIsSetToken] = useState(false)

  const durationDay = pollDetail
    ? Math.floor((pollDetail.endTimeStamp.getTime() - pollDetail.startTimeStamp.getTime()) / (60 * 60 * 24 * 1000))
    : 7
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

  const onChangeTokenAddress = async (address: string) => {
    setTokenAddress(address)
    if (ethers.utils.isAddress(address)) {
      loadTokenSymbol(address).then((symbol) => {
        setTokenSymbol(symbol)
      })
      loadTokenName(address).then((name) => {
        setTokenName(name)
      })
    } else {
      setTokenSymbol(t.CreateDao.Step2.NotSet)
    }
  }

  const _createDao = async () => {
    setDeployErrorMessage("")
    setLoading(true)
    try {
      await migrateDao()
      console.log({ durationDay })

      await createDao(
        daoId as string,
        projectId as string,
        daoInfo?.name || "",
        daoInfo?.description || "",
        "https://...",
        daoInfo?.logo || "",
        tokenAddress,
        contributorReward || 0,
        voterReward || 0,
        durationDay || 7
      )
      setLoading(false)
    } catch (err: any) {
      //必要に応じてRetry
      setDeployErrorMessage(err.message)
    }
  }

  const renderSetRewardToken = () => {
    if (isSetToken) return <div />
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

        <Center mt="xl">
          <Button
            onClick={() => setIsSetToken(true)}
            size="xl"
            variant="gradient"
            gradient={{ deg: 0, from: "blue", to: "grape" }}
          >
            設定
          </Button>
        </Center>
      </>
    )
  }

  const renderReviewTable = () => {
    if (!isSetToken) return <div />
    return (
      <Table horizontalSpacing="md" verticalSpacing="sm" fontSize="lg">
        <thead>
          <tr>
            <th>{t.CreateDao.Step3.Setting}</th>
            <th>{t.CreateDao.Step3.Value}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t.Settings.TokenSetting.TokenDistribution}</td>
            <td>
              {tokenName} (<b>{tokenSymbol}</b>)
            </td>
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
              {voterReward || 0} <b>{tokenSymbol}</b>
            </td>
          </tr>

          <tr>
            <td>{t.Settings.PollDuration.Title}</td>
            <td>
              {durationDay} {t.Settings.PollDuration.DayUnit}
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  const completedStep = () => {
    if (!isSetToken) return <div />
    return (
      <Stack>
        <Center>{loading && <Loader color="violet" size="xl" />}</Center>
        <Center>
          <Text>{t.CreateDao.Complete.Wait}</Text>
        </Center>
        <Center>
          <Text color="red">{deployErrorMessage}</Text>
        </Center>

        {deployErrorMessage ? (
          <Center mt="xl">
            <Button onClick={_createDao} size="xl" variant="gradient" gradient={{ deg: 0, from: "blue", to: "grape" }}>
              {t.CreateDao.Complete.Retry}
            </Button>
          </Center>
        ) : (
          <Center>
            <Center mt="xl">
              <Button
                onClick={_createDao}
                size="xl"
                variant="gradient"
                gradient={{ deg: 0, from: "blue", to: "grape" }}
              >
                {t.CreateDao.Complete.AcceptTransaction}
              </Button>
            </Center>
          </Center>
        )}
      </Stack>
    )
  }

  return (
    <Container my="xl">
      <NetworkCheck isWeb3={isWeb3} />
      <Center mb="xl">
        <Title size="h1">{t.Migration.Title}</Title>
      </Center>
      {renderSetRewardToken()}
      {renderReviewTable()}
      {completedStep()}
    </Container>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  // migrationのため必ずisWeb3がtrue
  return { props: { isWeb3: true } }
}

Page.noNavbar = true
export default Page
