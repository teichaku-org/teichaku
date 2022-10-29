
import { Links } from "@/constants/Links"
import { Contribution } from "@/domains/Contribution"
import { shortenAddress } from "@/utils/shortenAddress"
import { shortenUrl } from "@/utils/shortenUrl"
import { css } from "@emotion/react"
import { Anchor, Text } from "@mantine/core"
import Link from "next/link"
import { RoleBadge } from "../common/RoleBadge"

interface Props {
    candidate: Contribution
}


export const CandidateInfo = (props: Props) => {
    const link = Links.getCommonPath() + "/assessments/" + props.candidate.contributor;

    return <div>
        <RoleBadge roles={props.candidate.roles} />
        <Text span size="xs" >by
            <Link href={link}>
                <Text variant="link" span >{shortenAddress(props.candidate.contributor)}</Text>
            </Link>
        </Text>

        <Text
            my="xl"
            weight={700}
            css={css`
          white-space: pre-wrap;
        `}>
            {props.candidate.contributionText}
        </Text>
        <p>
            {props.candidate.evidences.map((evidence) =>
                <Anchor key={evidence} rel="noopener noreferrer" target="_blank" href={evidence}>{shortenUrl(evidence)}</Anchor>)}
        </p>
    </div>
}