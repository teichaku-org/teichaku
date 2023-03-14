// 受け取れるトークンの額が表示されたポップアップ
// 承認するとトークンを受け取れる

import { useMigrateWeb3 } from "@/hooks/useMigrateWeb3"
import { useLocale } from "@/i18n/useLocale"
import { Modal, Image, Center, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { ConnectWallet } from "../web3/login/ConnectWallet"

export const TokenReceiveModal = () => {
  const { t } = useLocale()
  const [opened, setOpened] = useState(false)
  const { getTokenReceiveRights, registerWallet } = useMigrateWeb3()

  useEffect(() => {
    getTokenReceiveRights().then((res) => {
      if (res) {
        setOpened(true)
      }
    })
  }, [])

  const onLogin = async () => {
    await registerWallet()
    setOpened(false)
  }

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title={t.TokenReceiveModal.Title}>
      <Image src="/migration_explanation.png" />

      <Text mt="xl">{t.TokenReceiveModal.Description}</Text>
      <Center mt="xl">
        <ConnectWallet isMetamaskOnly={true} onLogin={onLogin} />
      </Center>
    </Modal>
  )
}
