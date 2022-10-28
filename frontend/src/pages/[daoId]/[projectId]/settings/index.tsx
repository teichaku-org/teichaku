import { DistributionSetting } from "@/components/setting/DistributionSetting"
import { PollDeadlineSetting } from "@/components/setting/PollDeadlineSetting"
import { PollPerspectiveSetting } from "@/components/setting/PollPerspectiveSetting"
import { SBTSetting } from "@/components/setting/SBTSetting"
import { TokenSetting } from "@/components/setting/TokenSetting"
import { TreasurySetting } from "@/components/setting/TreasurySetting"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import { Center, Container, Title, Text } from "@mantine/core"

const SettingPage = () => {
    useDaoExistCheck()
    useDaoLoad()
    return <Container>
        <Center>
            <Title size="h1">Settings</Title>
        </Center>
        <Center mb="md">
            <Text color="dimmed">Setting is being built now! Most features still don't work.</Text>
        </Center>

        <TokenSetting />
        <TreasurySetting />
        <DistributionSetting />
        <PollPerspectiveSetting />
        <PollDeadlineSetting />
        <SBTSetting />
    </Container>
}
export default SettingPage