import { Candidate } from "@/domains/Candidate"
import { shortenAddress } from "@/utils/shortenAddress"
import { shortenUrl } from "@/utils/shortenUrl"
import { css } from "@emotion/react"
import { Text } from "@mantine/core"
import Link from "next/link"
import { RoleBadge } from "../common/RoleBadge"

interface Props {
    candidate: Candidate
}


export const CandidateInfo = (props: Props) => {
    //TODO: roleのバッチをつける
    //TODO: 情報に強弱をつける

    return <div>

        <RoleBadge roles={props.candidate.roles} />
        <Text span size="xs" >by <Text variant="link" span >{shortenAddress(props.candidate.contributor)}</Text></Text>

        <Text
            my="xl"
            css={css`
          white-space: pre-wrap;
          text-overflow: ellipsis;
          overflow: hidden;
        `}>{props.candidate.contributionText}</Text>
        <p>
            {props.candidate.evidences.map((evidence) =>
                <a target="_blank" href={evidence}>{shortenUrl(evidence)}</a>)}
        </p>
    </div>
}