import { Links } from "@/constants/Links"
import { Contribution } from "@/domains/Contribution"
import { shortenAddress } from "@/utils/shortenAddress"
import { shortenUrl } from "@/utils/shortenUrl"
import { css } from "@emotion/react"
import { Anchor, Grid, Paper, Space, Text } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { RoleBadge } from "../common/RoleBadge"

interface Props {
  candidate: Contribution
}

export const CandidateInfo = (props: Props) => {
  const router = useRouter()
  const link = Links.getCommonPath(router) + "/assessments/" + props.candidate.contributor

  return (
    <div>
      <Grid justify="right" align="center">
        <RoleBadge roles={props.candidate.roles} />
        <Space w="xs" />
        <Text span size="xs">
          by{" "}
          <Link href={link}>
            <Text variant="link" span>
              {shortenAddress(props.candidate.contributor)}
            </Text>
          </Link>
        </Text>
      </Grid>

      <Paper p="lg" mt="lg" mb="lg">
        <Text
          my="xl"
          weight={700}
          css={css`
            white-space: pre-wrap;
          `}
        >
          {props.candidate.contributionText}
        </Text>
        <p style={{ display: "flex", flexDirection: "column" }}>
          {props.candidate.evidences.map((evidence) => (
            <Anchor key={evidence} rel="noopener noreferrer" target="_blank" href={evidence}>
              {shortenUrl(evidence)}
            </Anchor>
          ))}
        </p>
      </Paper>
    </div>
  )
}
