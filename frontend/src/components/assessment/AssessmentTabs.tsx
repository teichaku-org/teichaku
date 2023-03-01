import { Center, Container, Tabs, Text } from "@mantine/core"
import { IconChartLine, IconChartPie3 } from "@tabler/icons"

import { DaoHistory } from "@/domains/DaoHistory"
import IndivisualTab from "./IndivisualTab"
import TotalTab from "./TotalTab"
import { useLocale } from "@/i18n/useLocale"

interface Props {
  daoHistory: DaoHistory[]
  address: string
  isWeb3: boolean
}

const AssessmentTabs = (props: Props) => {
  const { t } = useLocale()
  const { NotConnectWallet, Total, Individual } = t.Assessment.AssessmentTabs
  const { daoHistory, address } = props

  if (!address) {
    return (
      <Center>
        <Text pt="xl">{NotConnectWallet}</Text>
      </Center>
    )
  }

  const myDaoHistory = () => {
    return daoHistory.filter((dao) => dao.contributor === address)
  }

  return (
    <Tabs defaultValue="total">
      <Tabs.List>
        <Tabs.Tab value="total" icon={<IconChartLine size={14} />}>
          {Total}
        </Tabs.Tab>
        <Tabs.Tab value="individual" icon={<IconChartPie3 size={14} />}>
          {Individual}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="total" pt="xs">
        <TotalTab myDaoHistory={myDaoHistory()} address={address} isWeb3={props.isWeb3} />
      </Tabs.Panel>

      <Tabs.Panel value="individual" pt="xs">
        <IndivisualTab myDaoHistory={myDaoHistory()} isWeb3={props.isWeb3} />
      </Tabs.Panel>
    </Tabs>
  )
}

export default AssessmentTabs
