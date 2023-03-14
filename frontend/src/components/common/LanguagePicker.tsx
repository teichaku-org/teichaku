import { useState } from "react"
import { createStyles, UnstyledButton, Menu, Image, Group } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons"
import { useRouter } from "next/router"
const BREAKPOINT = "@media (max-width: 755px)"

const data = [
  { label: "English", image: "/english.png", value: "en" },
  { label: "Japanese", image: "/japanese.png", value: "ja" },
]

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 170,
    [BREAKPOINT]: {
      width: 55,
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[opened ? 5 : 6] : opened ? theme.colors.gray[0] : theme.white,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    [BREAKPOINT]: {
      display: "none",
    },
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}))

export function LanguagePicker() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const activeLocalData = data.find((item) => item.value === activeLocale)
  const [opened, setOpened] = useState(false)
  const { classes } = useStyles({ opened })
  const [selected, setSelected] = useState(activeLocalData)

  const onSelected = (item: any) => {
    setSelected(item)
    setOpened(false)
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      router.asPath,
      { locale: item.value }
    )
  }

  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => onSelected(item)}
      key={item.label}
    >
      <span className={classes.label}>{item.label}</span>
    </Menu.Item>
  ))

  return (
    <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" width="target">
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={selected?.image} width={22} height={22} />
            <span className={classes.label}>{selected?.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  )
}
