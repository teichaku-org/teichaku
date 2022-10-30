import { useLocale } from '@/i18n/useLocale';
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
const Problem = ({ title, solutionTitle, solutionName, image }: ProblemProps) => {
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
    const { t } = useLocale()
    const problems = [
        {
            title: t.LP.Problems.Onboarding.Title,
            solutionTitle: t.LP.Problems.Onboarding.SolutionTitle,
            solutionName: t.LP.Problems.Onboarding.SolutionName,
            image: "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/history.png"
        },
        {
            title: t.LP.Problems.Hurdle.Title,
            solutionTitle: t.LP.Problems.Hurdle.SolutionTitle,
            solutionName: t.LP.Problems.Hurdle.SolutionName,
            image: "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/contribution.png"
        },
        {
            title: t.LP.Problems.Reward.Title,
            solutionTitle: t.LP.Problems.Reward.SolutionTitle,
            solutionName: t.LP.Problems.Reward.SolutionName,
            image: "https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/assessment.png"
        }
    ]
    return <Container size="lg">
        <h2>
            <Text variant='gradient' gradient={{ from: "blue", to: "grape" }} >{t.LP.Problems.Title}</Text>
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