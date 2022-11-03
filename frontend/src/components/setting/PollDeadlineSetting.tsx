import { useLocale } from "@/i18n/useLocale";
import { Button, Card, Paper, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

export const PollDeadlineSetting = () => {
  const { t } = useLocale();
  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.PollDeadlineSetting.Title}
      </Text>
      <DatePicker
        mb="md"
        placeholder={t.Settings.PollDeadlineSetting.DatePicker.Placeholder}
        label={t.Settings.PollDeadlineSetting.DatePicker.Label}
        dropdownPosition="top-start"
      />

      <Button>{t.Button.Update}</Button>
    </Paper>
  );
};
