import { Button, Container, createStyles, Header, ThemeIcon } from '@mantine/core';
import { IconCoin, IconLogout } from '@tabler/icons';
import { AppLogo } from './AppLogo';
import { AppMenu } from './AppMenu';

const HEADER_HEIGHT = 84;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

}));


export function AppHeader() {
    const { classes, cx } = useStyles();

    return (
        <Header height={HEADER_HEIGHT} mb={120}>
            <Container className={classes.inner}>

                <AppLogo />

                <AppMenu />
            </Container>
        </Header>
    );
}