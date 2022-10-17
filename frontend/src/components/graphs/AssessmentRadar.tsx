// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import { Button, Text } from '@mantine/core'
import { ResponsiveRadar } from '@nivo/radar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface Props {
    data: Record<string, unknown>[] // [{ perspectve: 'Math', You: 120, Average:48 }, ...]
}
export const AssessmentRadar = ({ data }: Props) => {

    return <ResponsiveRadar
        data={data}
        keys={["You", "Average"]}
        indexBy="perspective"
        theme={{ textColor: "white", fontSize: 16 }}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'nivo' }}
        motionConfig="wobbly"
    />
}