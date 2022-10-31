import { Links } from "@/constants/Links";
import { shortenAddress } from "@/utils/shortenAddress";
import { Avatar, createStyles, Group, Paper, Spoiler, Text } from "@mantine/core"
import Link from "next/link";
import { useRouter } from "next/router";
const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
    },
}));

interface Props {
    comments: { comment: string, author: string, timestamp: Date }[]
    pollId: number
}

export const Comments = (props: Props) => {
    const { classes } = useStyles();
    const router = useRouter()

    return <Spoiler maxHeight={400} showLabel="Show more" hideLabel="Hide">
        {props.comments.map(c => {
            const link = Links.getCommonPath(router) + "/assessments/" + c.author;
            return <Paper key={c.author + props.pollId} withBorder radius="md" p="md" mb="md">
                <Group>
                    <Avatar color="cyan" radius="xl" >{c.author?.substring(2, 4)}</Avatar>
                    <div>
                        <Text span size="xs" >by{" "}
                            <Link href={link}>
                                <Text variant="link" span >{shortenAddress(c.author)}</Text>
                            </Link>
                        </Text>
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