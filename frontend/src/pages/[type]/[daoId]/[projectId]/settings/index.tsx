import { DistributionSetting } from "@/components/setting/DistributionSetting"
import { PollDeadlineSetting } from "@/components/setting/PollDeadlineSetting"
import { PollPerspectiveSetting } from "@/components/setting/PollPerspectiveSetting"
import { SBTSetting } from "@/components/setting/SBTSetting"
import { TokenSetting } from "@/components/setting/TokenSetting"
import { TreasurySetting } from "@/components/setting/TreasurySetting"
import { Web3MigrationSetting } from "@/components/setting/Web3MigrationSetting"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/utils/APIClient"
import { checkWeb3 } from "@/utils/checkWeb3"
import { Center, Container, Title, Text } from "@mantine/core"

type Props = {
  isWeb3: boolean
}

const SettingPage = ({ isWeb3 }: Props) => {
  const { t } = useLocale()
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)
  return (
    <Container>
      <Center>
        <Title size="h1">{t.Settings.Title}</Title>
      </Center>
      <Center mb="md">
        <Text color="dimmed">{t.Settings.SubTitle}</Text>
      </Center>
      {isWeb3 ? (
        <>
          <TokenSetting isWeb3={isWeb3} />
          <TreasurySetting isWeb3={isWeb3} />
          <DistributionSetting isWeb3={isWeb3} />
          <PollPerspectiveSetting isWeb3={isWeb3} />
          <PollDeadlineSetting isWeb3={isWeb3} />
          <SBTSetting isWeb3={isWeb3} />
        </>
      ) : (
        <>
          <DistributionSetting isWeb3={isWeb3} />
          <PollPerspectiveSetting isWeb3={isWeb3} />
          <PollDeadlineSetting isWeb3={isWeb3} />
          <Web3MigrationSetting />
        </>
      )}
    </Container>
  )
}

export async function getServerSideProps(context: {
  resolvedUrl: string
  query: { daoId: string; type: "check" | "web2" | "web3" }
}) {
  const webType = context.query.type
  const daoId = context.query.daoId
  const isWeb3 = await checkWeb3(webType, daoId)
  if (webType === "check") {
    return {
      redirect: {
        permanent: false,
        destination: context.resolvedUrl.replace("check", isWeb3 ? "web3" : "web2"),
      },
    }
  }
  return {
    props: {
      isWeb3,
    },
  }
}

export default SettingPage
