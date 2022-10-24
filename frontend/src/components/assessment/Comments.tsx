import { shortenAddress } from "@/utils/shortenAddress";
import { Avatar, createStyles, Group, Paper, Spoiler, Text } from "@mantine/core"
const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
    },
}));

interface Props {
    comments: { comment: string, author: string, timestamp: Date }[]
}

export const Comments = (props: Props) => {
    const { classes } = useStyles();
    return <Spoiler maxHeight={400} showLabel="Show more" hideLabel="Hide">
        {props.comments.map(c => {
            return <Paper key={c.comment} withBorder radius="md" p="md" mb="md">
                <Group>
                    <Avatar color="cyan" radius="xl" >{c.author?.substring(2, 4)}</Avatar>
                    <div>
                        <Text span size="xs" >by <Text variant="link" span >{shortenAddress(c.author)}</Text></Text>
                        <Text size="xs" color="dimmed">
                            {c.timestamp.toLocaleString()}
                        </Text>
                    </div>
                </Group>
                <Text className={classes.body} size="sm">
                    {c.comment}
                </Text>
            </Paper>
        })}</Spoiler>
}