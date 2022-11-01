import { useFollowDao } from "@/hooks/useFollowDao";
import { useLocale } from "@/i18n/useLocale";
import { Avatar, Text, Button, Paper, Group } from "@mantine/core";

interface Props {
  daoId: string;
  avatar: string;
  name: string;
  description: string;
  contributionCount: number;
  contributorCount: number;
  voterCount: number;
}

export function OrganizationCard(props: Props) {
  const { daoId, avatar, name, description } = props;
  const { follow, isFollowed, unfollow } = useFollowDao();
  const { t } = useLocale();
  const { Contributions, Contributors, Voters } = t.Overview.OrganizationCard;

  const stats = [
    { label: Contributions, value: props.contributionCount },
    { label: Contributors, value: props.contributorCount },
    { label: Voters, value: props.voterCount },
  ];
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {description}
      </Text>
      <Group mt="md" position="center" spacing={50}>
        {items}
      </Group>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        variant={isFollowed(daoId) ? "outline" : "filled"}
        onClick={() => {
          if (isFollowed(daoId)) {
            unfollow(daoId);
          } else {
            follow(daoId);
          }
        }}
      >
        {isFollowed(daoId) ? t.Button.Unfollow : t.Button.Follow}
      </Button>
    </Paper>
  );
}
