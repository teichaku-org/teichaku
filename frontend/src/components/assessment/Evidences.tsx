import { shortenAddress } from "@/utils/shortenAddress";
import { Anchor, Avatar, createStyles, Group, List, Paper, Spoiler, Text } from "@mantine/core"


interface Props {
    evidences: string[]
}

export const Evidences = (props: Props) => {
    const evidences = props.evidences.filter(e => e !== "")
    return <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
        <List type="ordered" size="sm">
            {evidences.map((e, index) => {
                return <List.Item key={e + index}>
                    <Anchor href={e} target="_blank" rel="noreferrer">{e}</Anchor>
                </List.Item>
            })}
        </List>
    </Spoiler>
}