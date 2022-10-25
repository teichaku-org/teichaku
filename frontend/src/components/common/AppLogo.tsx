import { AppInfo } from "@/constants/AppInfo";
import { createStyles, Text, ThemeIcon } from "@mantine/core";
import { IconLetterT, IconSquareLetterT } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  logo: {
    display: "flex",
    alignItems: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
    textDecoration: "none",
    fontSize: 20,
    fontWeight: 600,
  },
}));

export const AppLogo = () => {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.logo}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        style={{ marginRight: 10 }}
        gradient={{ deg: 0, from: "blue", to: "grape" }}
      >
        <IconLetterT size={28} stroke={1.5} />
      </ThemeIcon>
      <Text>{AppInfo.name}</Text>
    </div>
  );
};
