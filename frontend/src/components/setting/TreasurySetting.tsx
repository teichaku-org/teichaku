import useDaoToken from "@/hooks/dao/useDaoToken"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { Text, Progress, Card, Button, Input, TextInput, Paper } from "@mantine/core"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useState } from "react"
export const TreasurySetting = (props: { isWeb3: boolean }) => {
  const { t } = useLocale()
  const router = useRouter()
  const { daoId, projectId } = router.query
  //TODO: Buildを通すために一旦isWeb3 = Trueを入れる
  const { contractAddress } = usePoll({ daoId: daoId as string, projectId: projectId as string }, props.isWeb3)
  const { treasuryBalance, tokenSymbol, sendToken } = useDaoToken(
    {
      daoId: daoId as string,
      projectId: projectId as string,
    },
    props.isWeb3
  )
  const [value, setValue] = useState("")
  const _sendToken = () => {
    sendToken(contractAddress, Number(value))
  }

  return (
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
  )
}
