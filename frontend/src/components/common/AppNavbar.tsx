import { MediaQuery, Navbar } from "@mantine/core";
import { NavbarLinks } from "./NavbarLinks";

export const AppNavbar = () => {
    return <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Navbar p="md" width={{ sm: 200 }} >
            <Navbar.Section grow mt="md">
                <NavbarLinks />
            </Navbar.Section>
        </Navbar>
    </MediaQuery >
}