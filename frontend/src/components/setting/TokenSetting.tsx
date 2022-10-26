import { Button, Card, TextInput } from "@mantine/core"

export const TokenSetting = () => {
    return <Card mb="lg">
        <TextInput
            placeholder="0x..."
            label="Token Address"
            mb="sm"
        />
        <Button>Update</Button>
    </Card>
}