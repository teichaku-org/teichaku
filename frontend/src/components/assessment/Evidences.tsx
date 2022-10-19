import { shortenAddress } from "@/utils/shortenAddress";
import { Anchor, Avatar, createStyles, Group, List, Paper, Spoiler, Text } from "@mantine/core"


interface Props {
    evidences: string[]
}

export const Evidences = (props: Props) => {
    return <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
        <List type="ordered" size="sm">
            {props.evidences.map(e => {
                return <List.Item key={e}>
                    <Anchor href={e} target="_blank" rel="noreferrer">{e}</Anchor>
                </List.Item>
            })}
        </List>
    </Spoiler>
}