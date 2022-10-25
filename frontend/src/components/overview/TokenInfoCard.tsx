import useDaoToken from "@/hooks/dao/useDaoToken"
import usePoll from "@/hooks/dao/usePoll"
import { shortenAddress } from "@/utils/shortenAddress";
import { Paper, Progress } from "@mantine/core"

import { createStyles, Text, Card, RingProgress, Group } from '@mantine/core';
import { IconCopyButton } from "../common/CopyButton";

const useStyles = createStyles((theme) => ({

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },

    lead: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 1,
    },
}));


export function TokenInfoCard() {
    const { classes, theme } = useStyles();

    const { tokenTotalSupply, tokenSymbol, tokenName, contractAddress } = useDaoToken()
    const { contributorReward, voterReward } = usePoll()

    const contributorRewardPercent = contributorReward / (contributorReward + voterReward) * 100
    const voterRewardPercent = voterReward / (contributorReward + voterReward) * 100
    const contributorValue = contributorReward + " " + tokenSymbol
    const voterValue = voterReward + " " + tokenSymbol
    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Text size="xl" color="dimmed" mb="sm">
                Rewards Token
            </Text>
            <Group>
                <Card p="xl">
                    <Text size="xs" color="dimmed">
                        Token Name
                    </Text>
                    <Text className={classes.lead}>
                        {tokenName}
                    </Text>
                </Card>
                <Card p="xl">
                    <Text size="xs" color="dimmed">
                        Token Symbol
                    </Text>
                    <Text className={classes.lead}>
                        {"$" + tokenSymbol}
                    </Text>
                </Card>

                <Card p="xl">
                    <Text size="xs" color="dimmed">
                        Total Supply
                    </Text>
                    <Text className={classes.lead}>
                        {tokenTotalSupply}
                    </Text>
                </Card>

                <Card p="xl">
                    <Text size="xs" color="dimmed">
                        Contract Address
                    </Text>
                    <Group spacing="xs">
                        <Text className={classes.lead}>
                            {shortenAddress(contractAddress)}
                        </Text>
                        <IconCopyButton text={contractAddress} />

                    </Group>
                </Card>
            </Group>

            <Text size="xl" color="dimmed" mt="xl" mb="sm">
                Distributions Per Sprint
            </Text>
            <Progress
                radius="xl"
                size={30}
                sections={[
                    { value: contributorRewardPercent, color: 'blue', label: 'Contributor', tooltip: contributorValue },
                    { value: voterRewardPercent, color: 'grape', label: 'Voter', tooltip: voterValue },
                ]}
            />
        </Paper>
    );
}
