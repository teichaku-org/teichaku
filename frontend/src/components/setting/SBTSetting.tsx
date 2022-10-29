import { Button, Text, Paper, TextInput } from "@mantine/core"

export const SBTSetting = () => {
    return <Paper p="lg" mb="lg">
        <Text size="md" weight={700} >
            SBT For Review
        </Text>
        <TextInput
            placeholder="0x..."
            label="SBT Address"
            mb="sm"
        />
        <Button>Update</Button>
    </Paper>
}