import useWeb3Auth from "@/hooks/web3/useWeb3Auth"
import { useLocale } from "@/i18n/useLocale"
import { shortenAddress } from "@/utils/shortenAddress"
import { Button, Menu } from "@mantine/core"
import { NavbarLinks } from "./NavbarLinks"

export const AppMenu = () => {
  const { t } = useLocale()
  const { address } = useWeb3Auth()
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button variant="gradient" gradient={{ from: "blue", to: "grape" }}>
          {shortenAddress(address)}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <NavbarLinks />
      </Menu.Dropdown>
    </Menu>
  )
}
