import { Button, Container, createStyles, Header, ThemeIcon } from '@mantine/core';
import { IconCoin, IconLogout } from '@tabler/icons';

const HEADER_HEIGHT = 84;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        textDecoration: 'none',
        fontSize: 20,
        fontWeight: 600,
    },

}));


export function AppHeader() {
    const { classes, cx } = useStyles();

    return (
        <Header height={HEADER_HEIGHT} mb={120}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <ThemeIcon
                        size="xl"
                        radius="md"
                        variant="gradient"
                        style={{ marginRight: 10 }}
                        gradient={{ deg: 0, from: "blue", to: "grape" }}
                    >
                        <IconCoin size={28} stroke={1.5} />
                    </ThemeIcon>
                    DAO History
                </div>


                <Button radius="xl" sx={{ height: 30 }}>
                    Get early access
                </Button>
            </Container>
        </Header>
    );
}