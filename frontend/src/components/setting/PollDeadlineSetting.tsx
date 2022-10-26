import { Button, Card, Paper, Text } from "@mantine/core"
import { DatePicker } from "@mantine/dates"

export const PollDeadlineSetting = () => {
    return <Paper p="lg" mb="lg">
        <Text size="md" weight={700} >
            Poll Deadline
        </Text>
        <DatePicker mb="md" placeholder="Pick date" label="Deadline date" dropdownPosition="top-start" />

        <Button>Update</Button>
    </Paper>
}
