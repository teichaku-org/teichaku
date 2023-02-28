import { Links } from "@/constants/Links"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { Text, Progress, Card, Button, Input, TextInput, Paper } from "@mantine/core"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useState } from "react"
export const Web3MigrationSetting = () => {
  const { t } = useLocale()
  const router = useRouter()
  const onClick = () => {
    const commonPath = Links.getCommonPath(router)
    router.push(`/${commonPath}/settings/migration`)
  }

  return (
    <Paper p="lg" mb="lg">
      <Button color="red" onClick={onClick}>
        {t.Button.Web3Migration}
      </Button>
    </Paper>
  )
}
