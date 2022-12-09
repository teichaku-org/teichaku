import useDaoToken from "@/hooks/dao/useDaoToken";
import { useLocale } from "@/i18n/useLocale";
import { Button, Text, Paper, TextInput, Card } from "@mantine/core";
import { useRouter } from "next/router";
import {useState} from "react";

export const TokenSetting = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  const { tokenSymbol } = useDaoToken({ daoId: daoId as string, projectId: projectId as string });
  const [value, onChangeText] = useState('');
  const onClick = () => console.log(value)

    return (
    <Paper p="lg" mb="lg">
      <Text size="md" weight={700}>
        {t.Settings.TokenSetting.TokenDistribution}
      </Text>
      <Card mb="md">
        {t.Settings.TokenSetting.CurrentTokenSymbol}{" "}
        <Text size="lg" weight={500} mb="md" span>
          {tokenSymbol}
        </Text>
      </Card>
      <TextInput
          placeholder="0x..."
          label={t.Settings.TokenSetting.AddressInput.Label}
          mb="sm"
          onChange={(event) => onChangeText(event.currentTarget.value)}
          value={value}
      />
      <Button onClick={onClick}>{t.Button.Update}</Button>
    </Paper>
  );
};
