import { css } from "@emotion/react";
import { createStyles, Paper, Text, useMantineTheme } from "@mantine/core";
import { MouseEventHandler } from "react";
import { EarnedCoin } from "../assessment/EarnedCoin";
import { RoleBadge } from "../common/RoleBadge";

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
  },
  reward: {},
}));

interface HistoryCardProps {
  contributionText: string;
  reward: string;
  roles: string[];
  timestamp: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function HistoryCard(props: HistoryCardProps) {
  const { classes } = useStyles();
  const { contributionText, reward, roles, timestamp, onClick } = props;
  const theme = useMantineTheme();

  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      className={classes.card}
      onClick={onClick}
    >
      <EarnedCoin reward={reward} />
      <RoleBadge roles={roles} />
      <Text
        size="lg"
        weight={500}
        mt="md"
        color={theme.colorScheme === "dark" ? "white" : "black"}
        css={css`
          margin-right: 5px;
          max-height: 25px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        `}
      >
        {contributionText}
      </Text>
      <Text
        size="sm"
        mt="sm"
        color={theme.colorScheme === "dark" ? "white" : "black"}
      >
        {timestamp}
      </Text>
    </Paper>
  );
}
