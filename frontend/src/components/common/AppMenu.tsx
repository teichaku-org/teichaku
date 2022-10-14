import { Button, Menu } from "@mantine/core"
import { NavbarLinks } from "./NavbarLinks"

export const AppMenu = () => {
    return <Menu trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
            <Button variant="gradient" gradient={{ from: 'blue', to: 'grape' }}>menu</Button>
        </Menu.Target>
        <Menu.Dropdown>
            <NavbarLinks />
        </Menu.Dropdown>
    </Menu>
}