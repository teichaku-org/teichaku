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
                image="https://yunomy-image-folder.s3.ap-northeast-1.amazonaws.com/web3hackathon/2022-10-13_20.18.02.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkgwRgIhAL%2BM1CJAGRCqECZIx4jcuI2BFIPcBdjOH3vrSwhcErNtAiEAnsDCdK0dEqm6C79%2FSq4Yn%2BO%2BaYOmfL7b28iniuqZuCgq7QIItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwzMzM3MDIwNjc3OTUiDDQYq8H11vP56H1alyrBAspOe3NnNAPDJUEYTf0SR%2B7iYsGm62pproBs3ZrkNmPPZWrCT%2FSVDs04IkluronixBwm58cOCx8a0blczfe7x3KGGWP7eD4LU%2F%2BumaV%2BvH60i%2BhjeFh915ebE203Qjdih0Uu7CxOsXLB5z1NWCKJbrYshVJHk8yQcCCAEyW3HsNF0XWkqV8E7SExtMTZr%2Fg4WfuiTN34NnyJo4Jkv0WXUIJiPF%2F5wEf0fZP70rz3iR5GzCmyROVNhoKfbT0dDA5yz3sRD9a3CdCCEatklIZbE2BhdL%2BBUQqgaisAz%2BuD7Ba1RzUTg18ALvomrvZFuLF5lDyJRM%2FmJx5D6HFgdz%2FaSBfK9gV%2BK6t5NyEDL0bhuddjiDzUhKAbqznQtqXsOCGyGOAvVdk6%2Bq6AWF3l43k%2FHJKsfQ0VhWA%2BSuLoC2GI7CGQ5DCL0aOaBjqyAhlFL2PTR248%2FAs8mCjLuo3M5eojJ2gBr6W3BhyhT8g1d164SSJqq38816O%2FY4YzTYEPEtRsXadJ0vfCqeb94THlrBFM1r%2BCoOQovl4I9j07wtHtGJ4CAXUQ24dqjoaOQEmvDhiZdDhXUP0QwrHBzvGiI9jl5S75ihGxevbmtOeus3JCBws7NRrSqct5vuskPH7fQ69vWemwzp%2BMZWmI3LrqvXO9HYveW71s4JfAqy8SIo4y6n17kEmaFJ5R69B6oOV2bFDzjFUW%2B2NqB1RvtSLSqIN1S0FPu%2F1pMxd2qIOg3b9HJj7rYvEb74ymujB4a8QmhlbyTLv%2FM%2BAXIGmpyW4EwyPWCTdE9n3yHUWCGiUBJ7zBPcx6ZbqdMCmzbqTSaUwMT1JLmKvDUZBNRMF%2BCnzLcA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221014T044303Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAU3MRROZJ66NMP5FP%2F20221014%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Signature=522ffe454011047b9638b12fdb90d69e667aa63e815131f340daa7be767a7947"
                category={solutionName} />
        </SimpleGrid>
    </Container>
}

export const Problems = () => {
    const problems = [
        {
            title: "WHAT THE FUCK IS THE DAO DOING?",
            solutionTitle: "It records the contributions that DAO members have made so far and helps newcomers to understand DAO.",
            solutionName: "DAO History is recorded on blockchain.",
        },
        {
            title: "The hurdles are too high!",
            solutionTitle: "Contributor rewards are determined by a 360-degree evaluation by DAO members.",
            solutionName: "You can get rewards just by voting.",
        },
        {
            title: "What is the benefits of participating?",
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