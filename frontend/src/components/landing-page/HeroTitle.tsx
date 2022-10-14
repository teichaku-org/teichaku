import { AppInfo } from '@/constants/AppInfo';
import { createStyles, Container, Text, Button, Group } from '@mantine/core';

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

    controls: {
        marginTop: theme.spacing.xl * 2,

        [BREAKPOINT]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: 54,
        paddingLeft: 38,
        paddingRight: 38,

        [BREAKPOINT]: {
            height: 54,
            paddingLeft: 18,
            paddingRight: 18,
            flex: 1,
        },
    },
}));

export function HeroTitle() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    {' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'grape' }} inherit>
                        No More Centrized DAO.
                    </Text>{' '}
                    The most friendly DAO system for everyone
                </h1>

                <Text className={classes.description} color="dimmed">
                    Decentrized fully DAO systems that are friendly to newcomers and core members.
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={classes.control}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'grape' }}
                        component="a"
                        href="/history"
                    >
                        Demo
                    </Button>

                    <Button
                        component="a"
                        size="xl"
                        variant="default"
                        className={classes.control}
                        href={AppInfo.inqueryUrl}
                    >
                        Contact Us
                    </Button>
                </Group>
            </Container>
        </div>
    );
}