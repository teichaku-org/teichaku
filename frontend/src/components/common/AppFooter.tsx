import { AppInfo } from '@/constants/AppInfo';
import { createStyles, Container, Group, ActionIcon, UnstyledButton, Button } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import { AppLogo } from './AppLogo';

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function AppFooter() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>

                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <Button variant='subtle' component="a" href={AppInfo.inqueryUrl}>
                        Contact us
                    </Button>
                    <ActionIcon size="lg" component="a" href="https://twitter.com/yuno_miyako2">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}