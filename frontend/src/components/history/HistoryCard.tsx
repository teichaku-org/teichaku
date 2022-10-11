import { css } from "@emotion/react";
import {
  Badge,
  createStyles,
  Paper,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconCoin } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
}));

interface HistoryCardProps {
  contributionText: string;
  reward: string;
  roles: string[];
  timestamp: string;
}

const jobColors: Record<string, string> = {
  開発者: "blue",
  マーケター: "orange",
  デザイナー: "green",
  プロダクトマネージャー: "grape",
};

export function HistoryCard(props: HistoryCardProps) {
  const { classes } = useStyles();
  const { contributionText, reward, roles, timestamp } = props;
  const theme = useMantineTheme();
  return (
    <Paper withBorder radius="md" className={classes.card}>
      <div
        css={css`
          display: flex;
        `}
      >
        <ThemeIcon
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ deg: 0, from: "pink", to: "orange" }}
        >
          <IconCoin size={28} stroke={1.5} />
        </ThemeIcon>
        <Text size="xl" mt="sm">
          {reward} ENG
        </Text>
      </div>
      {roles.map((role, index) => (
        <Badge
          color={jobColors[role]}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {role}
        </Badge>
      ))}
      <Text size="xl" weight={500} mt="md">
        {contributionText}
      </Text>
      <Text size="sm" mt="sm">
        {timestamp}
      </Text>
    </Paper>
  );
}
