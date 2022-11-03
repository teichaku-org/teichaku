import { useLocale } from "@/i18n/useLocale";
import { Button, Text, Paper, TextInput } from "@mantine/core";

export const SBTSetting = () => {
  const { t } = useLocale();
  return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.SBTSetting.Title}
      </Text>
      <TextInput placeholder="0x..." label={t.Settings.SBTSetting.SBTAddressInput.Label} mb="sm" />
      <Button>{t.Button.Update}</Button>
    </Paper>
  );
};
