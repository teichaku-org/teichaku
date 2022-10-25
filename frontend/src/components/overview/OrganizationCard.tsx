import { useFollowDao } from '@/hooks/useFollowDao';
import { Avatar, Text, Button, Paper } from '@mantine/core';

interface Props {
    daoId: string;
    avatar: string;
    name: string;
    description: string;
}

export function OrganizationCard({ daoId, avatar, name, description }: Props) {

    const { follow, isFollowed, unfollow } = useFollowDao();

    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Avatar src={avatar} size={120} radius={120} mx="auto" />
            <Text align="center" size="lg" weight={500} mt="md">
                {name}
            </Text>
            <Text align="center" color="dimmed" size="sm">
                {description}
            </Text>

            <Button
                fullWidth
                radius="md"
                mt="xl"
                size="md"
                variant={isFollowed(daoId) ? 'outline' : 'filled'}
                onClick={() => {
                    if (isFollowed(daoId)) {
                        unfollow(daoId);
                    } else {
                        follow(daoId);
                    }
                }}
            >
                {isFollowed(daoId) ? 'Unfollow' : 'Follow'
                }
            </Button>
        </Paper >
    );
}