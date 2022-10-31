import { MediaQuery, Navbar } from "@mantine/core";
import { NavbarLinks } from "./NavbarLinks";

export const AppNavbar = () => {
    return <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Navbar p="md" width={{ sm: 250 }} >
            <Navbar.Section grow mt="md">
                <NavbarLinks />
            </Navbar.Section>
        </Navbar>
    </MediaQuery >
}