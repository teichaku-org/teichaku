import { Links } from "@/constants/Links";
import { useLocale } from "@/i18n/useLocale";
import { UnstyledButton, Group, ThemeIcon, Text } from "@mantine/core";
import { IconMessages, IconInfoSquare, IconBackhoe, IconCoin, IconSettings, IconWalk } from "@tabler/icons";
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
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
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
  const { t } = useLocale();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  let commonPath = Links.getCommonPath(router);
  if (!(daoId && projectId)) {
    commonPath = process.env.NEXT_PUBLIC_DEMO_PATH || commonPath;
  }
  const data = [
    {
      icon: <IconInfoSquare size={16} />,
      color: "green",
      label: t.Common.AppMenu.Overviews,
      path: commonPath + "/overview",
    },
    { icon: <IconBackhoe size={16} />, color: "teal", label: t.Common.AppMenu.History, path: commonPath + "/history" },
    {
      icon: <IconWalk size={16} />,
      color: "cyan",
      label: t.Common.AppMenu.Contribution,
      path: commonPath + "/contribution",
    },
    {
      icon: <IconMessages size={16} />,
      color: "indigo",
      label: t.Common.AppMenu.SprintReview,
      path: commonPath + "/poll",
    },
    {
      icon: <IconCoin size={16} />,
      color: "violet",
      label: t.Common.AppMenu.Assessments,
      path: commonPath + "/assessments",
    },
    {
      icon: <IconSettings size={16} />,
      color: "grape",
      label: t.Common.AppMenu.Settings,
      path: commonPath + "/settings",
    },
  ];

  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};
