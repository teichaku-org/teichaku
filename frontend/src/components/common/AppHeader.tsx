import useMetaMask from '@/hooks/web3/useMetaMask';
import { Button, Container, createStyles, Header, ThemeIcon } from '@mantine/core';
import { IconCoin, IconLogout } from '@tabler/icons';
import ConnectWallet from '../web3/login/ConnectWallet';
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
    const { address } = useMetaMask()

    return (
        <Header height={HEADER_HEIGHT} mb={120}>
            <Container className={classes.inner}>

                <AppLogo />
                {address ? <AppMenu /> : <ConnectWallet />}
            </Container>
        </Header>
    );
}