// 受け取れるトークンの額が表示されたポップアップ
// 承認するとトークンを受け取れる

import { useLocale } from "@/i18n/useLocale"
import { Modal, Image, Center, Text } from "@mantine/core"
import { useState } from "react"
import { ConnectWallet } from "../web3/login/ConnectWallet"


export const TokenReceiveModal = () => {
  const {t} = useLocale()
  const [ opened, setOpened ] = useState(true)

  const onLogin = () => {
    // TODO: ここでアカウントIDとメタマスクウォレットアドレスを紐付けるAPIを実行する
    //　成功したら、ポップアップを閉じる
    setOpened(false)
  }

  return <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title={t.TokenReceiveModal.Title}
  >
    <Image src="/migration_explanation.png" />

  <Text mt="xl">
    {t.TokenReceiveModal.Description}
  </Text>
    <Center mt="xl">
      <ConnectWallet isMetamaskOnly={true} onLogin={onLogin} />
    </Center>
  </Modal>
}