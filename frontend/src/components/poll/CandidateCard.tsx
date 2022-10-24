import { Candidate } from "@/domains/Candidate"
import useDaoToken from "@/hooks/dao/useDaoToken"
import { css } from "@emotion/react"
import { Center, Grid, Paper, Select, Text, Textarea, ThemeIcon } from "@mantine/core"
import { IconCoin } from "@tabler/icons"
import { CandidateInfo } from "./CandidateInfo"

interface Props {
    candidate: Candidate
    perspectives: string[]
    point: number[]
    comment: string
    distribution: number
    disabled: boolean
    onChangePoint: (point: number[]) => void
    onChangeComment: (comment: string) => void
}

export const CandidateCard = (props: Props) => {
    const { tokenSymbol } = useDaoToken()
    const options = [
        { value: "0", label: "🤔Umm...(0)" },
        { value: "1", label: "🙂OK(1)" },
        { value: "3", label: "😄Nice(3)" },
        { value: "6", label: "😆Great(6)" },
        { value: "10", label: "😍Excellent(10)" },]

    const onChangePoint = (value: string, index: number) => {
        const newPoint = [...props.point]
        newPoint[index] = parseInt(value)
        props.onChangePoint(newPoint)
    }

    const selects = () => {
        return props.perspectives.map((perspective, index) =>
            <Select
                required={true}
                key={perspective}
                label={perspective}
                placeholder="Pick one"
                data={options}
                value={String(props.point[index])}
                shadow="1px 1px 2px 0px rgba(0,0,0,0.75)"
                onChange={(e) => e ? onChangePoint(e, index) : null}
                mb="sm"
                disabled={props.disabled}
            />)
    }

    if (props.disabled) {
        return <Paper p="lg" radius="lg" withBorder mb="sm">
            <CandidateInfo candidate={props.candidate} />
        </Paper>
    }

    return <Paper p="lg" radius="lg" withBorder mb="lg">
        <CandidateInfo candidate={props.candidate} />
        <Grid align="center">
            <Grid.Col xs={12} md={8}>{selects()}</Grid.Col>
            <Grid.Col xs={12} md={4}>
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
                            {tokenSymbol}
                        </span>
                    </Text>
                </Center>

            </Grid.Col>

        </Grid>
        <Textarea
            mt="lg"
            placeholder="Your comment"
            label="comment (optional)"
            radius="md"
            onChange={e => props.onChangeComment(e.currentTarget.value)}
            value={props.comment}
            disabled={props.disabled}
        />
    </Paper>
}