import { Button, Card, TextInput } from "@mantine/core"

export const SBTSetting = () => {
    return <Card mb="lg">
        <TextInput
            placeholder="0x..."
            label="SBT Address"
            mb="sm"
        />
        <Button>Update</Button>
    </Card>
}