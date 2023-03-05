import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { Center, Container, createStyles, Header } from "@mantine/core"
import { ConnectWallet } from "../web3/login/ConnectWallet"
import { AppLogo } from "./AppLogo"
import { AppMenu } from "./AppMenu"
import { LanguagePicker } from "./LanguagePicker"
import { useAtom } from "jotai"
import { WalletAddressAtom } from "@/domains/atoms/WalletAddressAtom"
import { useEffect } from "react"

const HEADER_HEIGHT = 70

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}))

export function AppHeader() {
  const { classes, cx } = useStyles()
  // const { address } = useWeb3Auth()
  const [address, setAddress] = useAtom(WalletAddressAtom)

  useEffect(() => {
    setAddress(sessionStorage.getItem("address"))
  }, [address])

  return (
    <Header height={HEADER_HEIGHT} mb={120}>
      <Container className={classes.inner}>
        <AppLogo />
        <Center>
          <LanguagePicker />
          <div style={{ width: 10 }} />
          {address ? <AppMenu /> : <ConnectWallet />}
        </Center>
      </Container>
    </Header>
  )
}
