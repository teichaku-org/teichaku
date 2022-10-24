import { AppInfo } from '@/constants/AppInfo';
import { createStyles, Container, Text, Button, Group } from '@mantine/core';
import { ActionButtons } from './ActionButtons';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    inner: {
        position: 'relative',
        paddingTop: 50,
        paddingBottom: 120,

        [BREAKPOINT]: {
            paddingBottom: 80,
            paddingTop: 120,
        },
    },

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

    description: {
        marginTop: theme.spacing.xl,
        fontSize: 24,

        [BREAKPOINT]: {
            fontSize: 18,
        },
    },
}));

export function HeroTitle() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    New DAO Framework to{' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'grape' }} inherit>
                        Make a Lasting Impact
                    </Text>{' '}
                    and Retain members.
                </h1>

                <Text className={classes.description} color="dimmed">
                    Fully on-chain and decentrized token distribution systems that are friendly to newcomers and core members.
                </Text>

                <ActionButtons />
            </Container>
        </div>
    );
}