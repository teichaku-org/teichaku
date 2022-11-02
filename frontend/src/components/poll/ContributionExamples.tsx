import { useLocale } from "@/i18n/useLocale";
import { Button, Card, Group, Text, Title } from "@mantine/core";

interface Props {
  onClick: (exampleText: string) => void;
}

export const ContributionExamples = (props: Props) => {
  const { t } = useLocale();
  const { Documentation, BugFix, Advertisement, Development, Design, Analysis, Anything } =
    t.Contribution.ContributionCard.ContributionExamples;
  const { ContributionExamples } = t.Contribution.ContributionCard;

  const examples = [
    {
      title: Documentation.Title,
      description: Documentation.Description,
    },
    {
      title: BugFix.Title,
      description: BugFix.Description,
    },
    {
      title: Advertisement.Title,
      description: Advertisement.Description,
    },
    {
      title: Development.Title,
      description: Development.Description,
    },
    {
      title: Design.Title,
      description: Design.Description,
    },
    {
      title: Analysis.Title,
      description: Analysis.Description,
    },
    {
      title: Anything.Title,
      description: Anything.Description,
    },
  ];

  return (
    <Card>
      <Title
        order={2}
        size="h1"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        weight={900}
        align="center"
      >
        {ContributionExamples.Title}
      </Title>

      <Group position="center" mt="lg">
        {examples.map((e) => {
          return (
            <Button key={e.title} size="lg" onClick={() => props.onClick(e.description)} variant="light">
              {e.title}
            </Button>
          );
        })}
      </Group>
    </Card>
  );
};
