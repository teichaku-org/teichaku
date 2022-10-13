import { ActionIcon, Box, Group, MediaQuery, Navbar, Text, useMantineColorScheme } from "@mantine/core"
import { IconSun, IconMoonStars } from "@tabler/icons"
import { NavbarLinks } from "./NavbarLinks";

export const AppNavbar = () => {
    return <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>

            <Navbar.Section grow mt="md">
                <NavbarLinks />
            </Navbar.Section>

        </Navbar>
    </MediaQuery>
}