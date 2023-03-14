import { AppInfo } from "@/constants/AppInfo"
import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { createStyles, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconLetterT, IconSquareLetterT } from "@tabler/icons"
import { useAtom } from "jotai"

const BREAKPOINT = "@media (max-width: 755px)"

const useStyles = createStyles((theme) => ({
  logo: {
    display: "flex",
    alignItems: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
    textDecoration: "none",
    fontSize: 20,
    fontWeight: 600,
    [BREAKPOINT]: {
      fontSize: 15,
      fontWeight: 600,
    },
  },
}))

export const AppLogo = () => {
  const [isWeb3] = useAtom(Web3FlagAtom)
  const { classes, cx } = useStyles()
  const matches = useMediaQuery(`(max-width: 755px)`)
  return (
    <div className={classes.logo}>
      <ThemeIcon
        size={matches ? "md" : "xl"}
        radius="md"
        variant="gradient"
        style={{
          marginRight: 10,
        }}
        gradient={{ deg: 0, from: "blue", to: "grape" }}
      >
        <IconLetterT size={matches ? 18 : 28} stroke={1.5} />
      </ThemeIcon>
      <Text>
        {AppInfo.name}({isWeb3 ? "web3" : "web2"})
      </Text>
    </div>
  )
}
