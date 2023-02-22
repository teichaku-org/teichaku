import useDaoToken from "@/hooks/dao/useDaoToken";
import usePoll from "@/hooks/dao/usePoll";
import { useLocale } from "@/i18n/useLocale";
import { Paper, TextInput, Button, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const SendTokenPage = () => {
    // トレジャリーにある資金が、分配に必要な資金を下回っている場合にwarningを出す
    const { t } = useLocale();
    const router = useRouter();
    const { daoId, projectId } = router.query;
    const dao = { daoId: daoId as string, projectId: projectId as string }
      //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
    const { contractAddress, contributorReward, voterReward, commissionFee } = usePoll(dao, true);
    const { treasuryBalance, tokenSymbol, sendToken } = useDaoToken(dao, true);
    const isShort = treasuryBalance < contributorReward + voterReward + commissionFee;
    const [value, setValue] = useState("");

    const _sendToken = () => {
        sendToken(contractAddress, Number(value));
    };


    return <>
        {isShort &&
            <Alert my="lg" icon={<IconAlertCircle size={16} />} title={t.Settings.TreasurySetting.TokenIsShortTitle} color="red">
                {t.Settings.TreasurySetting.TokenIsShortDescription(contributorReward + voterReward + commissionFee)}
            </Alert>}
        <Paper p="lg" mb="lg">
            <Text size="md" weight={700}>
                {t.Settings.TreasurySetting.Title}
            </Text>
            <Text size="lg" weight={500} mb="md">
                {treasuryBalance} {tokenSymbol}
            </Text>
            <TextInput
                label={t.Settings.TreasurySetting.SendTokenInput.Label}
                placeholder={t.Settings.TreasurySetting.SendTokenInput.Placeholder}
                mb="sm"
                onChange={(e) => setValue(e.currentTarget.value)}
                value={value}
            />
            <Button onClick={_sendToken}>{t.Button.Add}</Button>
        </Paper>
    </>
}

export default SendTokenPage