import { Button, Card, Group, Text, Title } from "@mantine/core"

interface Props {
    onClick: (exampleText: string) => void
}

export const ContributionExamples = (props: Props) => {

    const examples = [
        {
            title: "Documentation",
            description: "I created a new documentation page for ...",
        },
        {
            title: "Bug Fix",
            description: "I fixed a bug in ...",
        },
        {
            title: "Advertisement",
            description: "I advertised the project on ...",
        },
        {
            title: "Development",
            description: "I developed a new ...",
        },
        {
            title: "Design",
            description: "I designed a new ...",
        },
        {
            title: "Analysis",
            description: "I analized ...",
        },
        {
            title: "Anything!!",
            description: "I did ...",
        }
    ]

    return <Card>
        <Title
            order={2}
            size="h1"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
            weight={900}
            align="center"
        >
            Pick Your Contributions!
        </Title>

        <Group position="center" mt="lg">
            {examples.map(e => {
                return <Button key={e.title} size="lg" onClick={() => props.onClick(e.description)} variant="light">{e.title}</Button>
            })}
        </Group>
    </Card>
}