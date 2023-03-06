import { Links } from "@/constants/Links"
import usePoll from "@/hooks/dao/usePoll"
import { useLocale } from "@/i18n/useLocale"
import { checkBrowser } from "@/utils/checkBrowser"
import { Text, Progress, Card, Button, Input, TextInput, Paper, Modal } from "@mantine/core"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
export const Web3MigrationSetting = () => {
  const { t } = useLocale()
  const router = useRouter()
  const browser = checkBrowser()
  const [opened, { open, close }] = useDisclosure(false)
  const onClick = () => {
    if (browser == "safari" || browser == "edge" || browser == "ie" || browser == "unknown") {
      open()
      return
    }
    const commonPath = Links.getCommonPath(router)
    router.push(`/${commonPath}/settings/migration`)
  }

  return (
    <Paper p="lg" mb="lg">
      <Button color="red" onClick={onClick}>
        {t.Button.Web3Migration}
      </Button>
      <Modal opened={opened} onClose={close} centered>
        <Text mt="xl">{t.Alert.UnsupportedBrowsers}</Text>
      </Modal>
    </Paper>
  )
}
