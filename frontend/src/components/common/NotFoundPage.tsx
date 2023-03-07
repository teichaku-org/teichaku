import { AppInfo } from "@/constants/AppInfo"
import { createStyles, Title, Text, Button, Container, Group } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl,
    color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
}))

export const NotFoundPage = () => {
  const { classes } = useStyles()
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text color="#CED4DA" size="lg" align="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another
        URL.
      </Text>
      <Group position="center">
        <Button
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "grape" }}
          component="a"
          href={`${process.env.NEXT_PUBLIC_DEMO_PATH}/overview`}
        >
          Try Demo
        </Button>

        <Button component="a" size="xl" variant="default" href={AppInfo.inqueryUrl}>
          Create Your DAO
        </Button>
      </Group>
    </Container>
  )
}
