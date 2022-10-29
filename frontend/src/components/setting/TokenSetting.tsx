import { Button, Text, Paper, TextInput } from "@mantine/core"

export const TokenSetting = () => {
    return <Paper p="lg" mb="lg">
        <Text size="md" weight={700} >
            Token for distribution
        </Text>
        <TextInput
            placeholder="0x..."
            label="ERC20 Token Address"
            mb="sm"
        />
        <Button>Update</Button>
    </Paper>
}