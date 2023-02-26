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

      <TokenSetting />
      <TreasurySetting />
      <DistributionSetting />
      <PollPerspectiveSetting />
      <PollDeadlineSetting />
      <SBTSetting />
      <Web3MigrationSetting />
    </Container>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  const apiClient = new APIClient()
  const res = await apiClient.post("/getIsWeb3", { daoId: context.query.daoId })
  return { props: { isWeb3: res ? res.data.isWeb3 : true } }
}

export default SettingPage
