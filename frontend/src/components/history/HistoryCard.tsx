import { Links } from "@/constants/Links"
import { shortenAddress } from "@/utils/shortenAddress"
import { css } from "@emotion/react"
import { createStyles, Grid, Paper, Space, Text, useMantineTheme } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { MouseEventHandler } from "react"
import { EarnedCoin } from "../assessment/EarnedCoin"
import { RoleBadge } from "../common/RoleBadge"

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl + 10,

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },
  },
  reward: {},
}))

interface HistoryCardProps {
  contributionText: string
  reward: string
  contractAddress: string
  roles: string[]
  timestamp: string
  onClick?: MouseEventHandler<HTMLDivElement>
  contributor: string
  isWeb3: boolean
}

export function HistoryCard(props: HistoryCardProps) {
  const { classes } = useStyles()
  const { contributionText, reward, contractAddress, roles, timestamp, onClick, contributor } = props
  const theme = useMantineTheme()
  const router = useRouter()
  const link = Links.getCommonPath(router) + "/assessments/" + contributor

  return (
    <Paper withBorder radius="md" p="lg" className={classes.card} onClick={onClick}>
      <EarnedCoin reward={reward} contractAddress={contractAddress} isWeb3={props.isWeb3} />
      <Grid justify="left" align="center" my="sm">
        <RoleBadge roles={roles} />
      </Grid>

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
      <Text size="sm" mt="sm" color={theme.colorScheme === "dark" ? "white" : "black"}>
        {timestamp}
      </Text>
    </Paper>
  )
}
