import useDaoToken from "@/hooks/dao/useDaoToken";
import { useLocale } from "@/i18n/useLocale";
import { Button, Text, Paper, TextInput, Card } from "@mantine/core";
import { useRouter } from "next/router";
import {useForm} from "@mantine/form";
import usePoll from "@/hooks/dao/usePoll";
import {ethers} from "ethers";

export const TokenSetting = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { daoId, projectId } = router.query;
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { tokenSymbol } = useDaoToken({ daoId: daoId as string, projectId: projectId as string }, true);
  const { setTokenAddress } = usePoll({ daoId: daoId as string, projectId: projectId as string }, true)

  const form = useForm({
    initialValues: {
      tokenAddress: "",
    },
    validate: {
      tokenAddress: (value) => (value != "" && !ethers.utils.isAddress(value)? t.CreateDao.Step2.InvalidTokenAddress : null),
    },
    validateInputOnChange: true
  });

  const update = () => {
    setTokenAddress(form.values.tokenAddress,null)
  }

  const shouldBeDisabled = () => {
    return form.values.tokenAddress == "" || !form.isValid()
  }

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
      <TextInput placeholder="0x..." label={t.Settings.TokenSetting.AddressInput.Label} mb="sm" {...form.getInputProps("tokenAddress")}　/>
      <Button disabled={shouldBeDisabled()} onClick={update}>{t.Button.Update}</Button>
    </Paper>
  );
};
