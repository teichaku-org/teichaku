import { DistributionSetting } from "@/components/setting/DistributionSetting"
import { PollDeadlineSetting } from "@/components/setting/PollDeadlineSetting"
import { SBTSetting } from "@/components/setting/SBTSetting"
import { TokenSetting } from "@/components/setting/TokenSetting"
import { TreasurySetting } from "@/components/setting/TreasurySetting"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { Center, Container, Title, Text } from "@mantine/core"

const SettingPage = () => {
    useDaoExistCheck()

    return <Container>
        <Center>
            <Title size="h1">Settings</Title>
        </Center>
        <Center mb="md">
            <Text color="dimmed">Setting is being built now! </Text>
        </Center>

        <TokenSetting />
        <TreasurySetting />
        <DistributionSetting />
        <PollDeadlineSetting />
        <SBTSetting />
    </Container>
}
export default SettingPage