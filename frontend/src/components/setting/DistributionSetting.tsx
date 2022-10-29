import { Button, Card, Paper, Text, TextInput } from "@mantine/core"

export const DistributionSetting = () => {
    return <Paper p="lg" mb="lg">
        <Text size="md" weight={700} >
            Distribution
        </Text>

        <TextInput
            placeholder="7000"
            label="Contributor Distribution(Total)"
            mb="sm"
        />
        <TextInput
            placeholder="3000"
            label="Reviewer Distribution(Total)"
            mb="sm"
        />
        <Button>Update</Button>
    </Paper>
}