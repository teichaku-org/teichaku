import { Text, Progress, Card, Button } from '@mantine/core';
export const TreasurySetting = () => {
    return <Card mb="lg">
        <Text size="md" weight={700} >
            Treasury
        </Text>
        <Text size="lg" weight={500} mb="md">
            {/* TODO: きちんとブロックチェーンから取得する */}
            120000 W3HC
        </Text>
        <Button>Add</Button>
    </Card>
}