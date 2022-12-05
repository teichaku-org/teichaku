import { useLocale } from "@/i18n/useLocale";
import { Button, Card, Group, Text, Title } from "@mantine/core";

interface Props {
  onClick: (exampleText: string, defaultRole: string) => void;
}

export const ContributionExamples = (props: Props) => {
  const { t } = useLocale();
  const { Development, Design, Translation, Documentation, Writing, Marketing, Community, Research, Operation, DataAnalysis, Anything } =
    t.Contribution.ContributionCard.ContributionExamples;
  const { ContributionExamples } = t.Contribution.ContributionCard;

  const examples = [
    { title: Development.Title, description: Development.Description, role: "Engineer" },
    { title: Design.Title, description: Design.Description, role: "Designer" },
    { title: Translation.Title, description: Translation.Description, role: "Translator" },
    { title: Documentation.Title, description: Documentation.Description, role: "Documenter" },
    { title: Writing.Title, description: Writing.Description, role: "Writer" },
    { title: Marketing.Title, description: Marketing.Description, role: "Marketer" },
    { title: Community.Title, description: Community.Description, role: "Community Manager" },
    { title: Research.Title, description: Research.Description, role: "Researcher" },
    { title: Operation.Title, description: Operation.Description, role: "Operator" },
    { title: DataAnalysis.Title, description: DataAnalysis.Description, role: "Data Analyst" },
    { title: Anything.Title, description: Anything.Description, role: "" },

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
            <Button key={e.title} size="lg" onClick={() => props.onClick(e.description, e.role)} variant="light">
              {e.title}
            </Button>
          );
        })}
      </Group>
    </Card>
  );
};
