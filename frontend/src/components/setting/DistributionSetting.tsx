import { Button, Card, Text, TextInput } from "@mantine/core"

export const DistributionSetting = () => {
    return <Card mb="lg">
        <Text size="md" weight={700} >
            Distribution
        </Text>

        <TextInput
            placeholder="7000"
            label="Contributor Distribution"
            mb="sm"
        />
        <TextInput
            placeholder="3000"
            label="Voter Distribution"
            mb="sm"
        />
        <Button>Update</Button>
    </Card>
}