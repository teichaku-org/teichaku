import { Container, Text, SimpleGrid, Skeleton, useMantineTheme, createStyles } from '@mantine/core';
import { SolutionCard } from './SolutionCard';
const BREAKPOINT = '@media (max-width: 755px)';
const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 62,
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [BREAKPOINT]: {
            fontSize: 42,
            lineHeight: 1.2,
        },
    },
}));

const PRIMARY_COL_HEIGHT = 300;
interface ProblemProps {
    title: string;
    solutionTitle: string;
    solutionName: string;

}
export const Problem = ({ title, solutionTitle, solutionName }: ProblemProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return <Container my="xl">
        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Text className={classes.title} component="span" variant="gradient" gradient={{ from: 'blue', to: 'grape' }} inherit>
                {title}
            </Text>
            <SolutionCard
                title={solutionTitle}
                image="https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/2022-10-13_20.18.02.png"
                category={solutionName} />
        </SimpleGrid>
    </Container>
}

export const Problems = () => {
    const problems = [
        {
            title: "WHAT THE FUCK IS THE DAO DOING?",
            solutionTitle: "All Contributions that DAO members have made so far is recorded and helps newcomers to understand DAO.",
            solutionName: "The history of DAO is recorded on blockchain.",
        },
        {
            title: "The hurdle to join is too high!",
            solutionTitle: "Rewards for contributors are determined by a 360-degree evaluation voting by DAO members and you can get rewards just by submitting the vote. It's very easy to participate in.",
            solutionName: "You can get rewards just by voting.",
        },
        {
            title: "Unclear benefits of participation",
            solutionTitle: "Evaluations and comments on your achievements are recorded and can be taken out as NFT.",
            solutionName: "Token and NFT are issued for your contribution.",
        }
    ]
    return <Container size="lg">
        <h2>
            <Text variant='gradient' gradient={{ from: "blue", to: "grape" }} >Problems of DAO and Our Solutions</Text>
        </h2>
        {problems.map((problem, index) =>
            <Problem
                key={index}
                title={problem.title}
                solutionName={problem.solutionName}
                solutionTitle={problem.solutionTitle}
            />)}
    </Container>
}