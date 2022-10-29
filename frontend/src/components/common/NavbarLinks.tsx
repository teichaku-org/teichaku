import { Links } from "@/constants/Links";
import { UnstyledButton, Group, ThemeIcon, Text } from "@mantine/core";
import { IconGitPullRequest, IconAlertCircle, IconMessages, IconDatabase, IconInfoSquare, IconBackhoe, IconCoin, IconSettings, IconWalk } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

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

                    <Text size="md">{label}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
}

export const NavbarLinks = () => {
    const router = useRouter()
    const { daoId, projectId } = router.query
    let commonPath = Links.getCommonPath()
    if (!(daoId && projectId)) {
        commonPath = process.env.NEXT_PUBLIC_DEMO_PATH || commonPath
    }
    const data = [
        { icon: <IconInfoSquare size={16} />, color: 'green', label: 'Overviews', path: commonPath + "/overview" },
        { icon: <IconBackhoe size={16} />, color: 'teal', label: 'History', path: commonPath + "/history" },
        { icon: <IconWalk size={16} />, color: 'cyan', label: 'Contribution', path: commonPath + "/contribution" },
        { icon: <IconMessages size={16} />, color: 'indigo', label: 'Poll', path: commonPath + "/poll" },
        { icon: <IconCoin size={16} />, color: 'violet', label: 'Assessments', path: commonPath + "/assessments" },
        { icon: <IconSettings size={16} />, color: 'grape', label: 'Settings', path: commonPath + "/settings" },
    ];

    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;

}