import { Container, Text, SimpleGrid, Skeleton, useMantineTheme, createStyles, Center } from '@mantine/core';
import { SolutionCard } from './SolutionCard';
const BREAKPOINT = '@media (max-width: 755px)';
const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 45,
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
    image: string;
}
export const Problem = ({ title, solutionTitle, solutionName, image }: ProblemProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return <Container my="xl">
        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Center>
                <Text className={classes.title} component="span" variant="gradient" gradient={{ from: 'blue', to: 'grape' }} inherit>
                    {title}
                </Text>
            </Center>

            <SolutionCard
                title={solutionTitle}
                image={image}
                category={solutionName} />
        </SimpleGrid>
    </Container>
}

export const Problems = () => {
    const problems = [
        {
            title: "Newcomers don't have idea what the DAO are doing?",
            solutionTitle: "All Contributions that DAO members have made so far is recorded and helps newcomers to understand DAO.",
            solutionName: "The history of DAO is recorded on blockchain.",
            image: "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/history.png"
        },
        {
            title: "The hurdle to get rewards is too high!",
            solutionTitle: "Any contribution is fine, just give it a try and everyone will evaluate it.",
            solutionName: "You can register your contributions without permission!",
            image: "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/contribution.png"
        },
        {
            title: "Unclear benefits of participation",
            solutionTitle: "The evaluation will be the token reward directly as it is. And evaluations and comments on your contributions are recorded on blockchain and can be exported as NFT.",
            solutionName: "Token and NFT are issued for your contribution.",
            image: "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/assessment.png"
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
                image={problem.image}
            />)}
    </Container>
}