import { UnstyledButton, Group, ThemeIcon, Text } from "@mantine/core";
import { IconGitPullRequest, IconAlertCircle, IconMessages, IconDatabase, IconInfoSquare, IconBackhoe, IconCoin, IconSettings } from "@tabler/icons";
import Link from "next/link";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    path: string;
}

function MainLink({ icon, color, label, path }: MainLinkProps) {
    return (
        <Link href={path} passHref>
            <UnstyledButton
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >

                <Group>
                    <ThemeIcon color={color} variant="light">
                        {icon}
                    </ThemeIcon>

                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
}

export const NavbarLinks = () => {
    const data = [
        { icon: <IconInfoSquare size={16} />, color: 'blue', label: 'DAO Overviews', path: "/overview" },
        { icon: <IconBackhoe size={16} />, color: 'teal', label: 'History', path: "/history" },
        { icon: <IconMessages size={16} />, color: 'violet', label: 'Poll', path: "/poll" },
        { icon: <IconCoin size={16} />, color: 'violet', label: 'Assessments', path: "/assessments" },
        { icon: <IconSettings size={16} />, color: 'grape', label: 'Settings', path: "/settings" },
    ];

    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;

}