import useWeb3Auth from "@/hooks/web3/useWeb3Auth";
import {
  Center,
  Container,
  createStyles,
  Header
} from "@mantine/core";
import { DevWeb3Toggle } from "../dev/DevWeb3Toggle";
import { ConnectWallet } from "../web3/login/ConnectWallet";
import { AppLogo } from "./AppLogo";
import { AppMenu } from "./AppMenu";
import { LanguagePicker } from "./LanguagePicker";

const HEADER_HEIGHT = 70;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export function AppHeader() {
  const { classes, cx } = useStyles();
  const { address } = useWeb3Auth()

  return (
    <Header height={HEADER_HEIGHT} mb={120}>
      <Container className={classes.inner}>
        <AppLogo />
        <DevWeb3Toggle />
        <Center>
          <LanguagePicker />
          <div style={{ width: 10 }} />
          {address ? <AppMenu /> : <ConnectWallet />}
        </Center>
      </Container>
    </Header>
  );
}
