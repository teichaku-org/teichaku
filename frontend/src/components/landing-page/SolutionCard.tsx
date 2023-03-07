import { Card, createStyles, Group, Image, Text } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}))

interface ArticleCardImageProps {
  image: string
  title: string
  category: string
}

export function SolutionCard({ image, title, category }: ArticleCardImageProps) {
  const { classes } = useStyles()

  return (
    <Card p="lg" radius="md">
      <Card.Section>
        <Image src={image} fit="contain" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{category}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {title}
      </Text>
    </Card>
  )
}
