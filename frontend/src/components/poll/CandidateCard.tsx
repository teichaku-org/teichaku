import { Contribution } from "@/domains/Contribution"
import { css } from "@emotion/react"
import { Alert, Card, Center, Grid, Paper, Select, SimpleGrid, Text, Textarea, ThemeIcon } from "@mantine/core"
import { IconAlertCircle, IconCoin } from "@tabler/icons"
import { AssessmentSelectCard } from "./AssessmentSelectCard"
import { CandidateInfo } from "./CandidateInfo"

interface Props {
    candidate: Contribution
    perspectives: string[]
    point: number[]
    comment: string
    distribution: number
    disabled: boolean
    tokenSymbol: string
    onChangePoint: (point: number[]) => void
    onChangeComment: (comment: string) => void
}

export const CandidateCard = (props: Props) => {
    const onChangePoint = (value: string, index: number) => {
        const newPoint = [...props.point]
        newPoint[index] = parseInt(value)
        props.onChangePoint(newPoint)
    }


    const selects = () => {
        return props.perspectives.map((perspective, index) =>
            <AssessmentSelectCard
                key={perspective}
                label={perspective}
                onChange={(e) => e ? onChangePoint(e, index) : null}
                value={String(props.point[index] || 0)}
            />
        )
    }

    if (props.disabled) {
        return <Card p="lg" radius="lg" withBorder mb="lg">
            <Alert mb="lg" color="blue" icon={<IconAlertCircle size={16} />} >
                This is your contribution, so you can't vote for yourself
            </Alert>
            <CandidateInfo candidate={props.candidate} />
        </Card>
    }
    return <Card p="lg" radius="lg" withBorder mb="lg">
        <CandidateInfo candidate={props.candidate} />

        <Center>
            <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ deg: 0, from: "blue", to: "grape" }}
            >
                <IconCoin size={28} stroke={1.5} />
            </ThemeIcon>
            <Text
                component="span"
                align="center"
                size="xl"
                weight={700}
                style={{ fontFamily: "Greycliff CF, sans-serif" }}
                css={css`
                            font-size: 30px;
                            margin-left: 5px;
                        `}
            >
                {props.distribution}
                <span
                    css={css`
                            font-size: 20px;
                            margin-left: 5px;
                            `}
                >
                    {props.tokenSymbol}
                </span>
            </Text>
        </Center>

        <SimpleGrid cols={3}
            spacing="lg"
            mt="lg"
            breakpoints={[
                { maxWidth: 980, cols: 3, spacing: 'md' },
                { maxWidth: 755, cols: 2, spacing: 'sm' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>

            {selects()}
        </SimpleGrid>
        <Textarea
            mt="lg"
            placeholder="Your comment"
            label="comment (optional)"
            radius="md"
            onChange={e => props.onChangeComment(e.currentTarget.value)}
            value={props.comment}
            disabled={props.disabled}
        />
    </Card >
}