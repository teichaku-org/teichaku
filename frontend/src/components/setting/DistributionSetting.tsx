import { useLocale } from "@/i18n/useLocale";
import { Button, Card, Paper, Text, TextInput } from "@mantine/core";

export const DistributionSetting = () => {
  const { t } = useLocale();
  const { Contributor, Reviewer } = t.Settings.DistributionSetting;
  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.DistributionSetting.Title}
      </Text>

      <TextInput placeholder="7000" label={Contributor.Label} mb="sm" />
      <TextInput placeholder="3000" label={Reviewer.Label} mb="sm" />
      <Button>{t.Button.Update}</Button>
    </Paper>
  );
};
