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

  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any
    return Boolean(ethereum && ethereum.isMetaMask)
  }

  const onClick = () => {
    // ブラウザが対応していないもしくは、metamaskをinstallしていないときに警告をだす
    if (browser == "safari" || browser == "edge" || browser == "ie" || browser == "unknown" || !isMetaMaskInstalled()) {
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
      <Modal opened={opened} onClose={close} centered title="MetaMaskのInstall">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div>Web3に移行するにはMetaMaskが必要です。</div>
          <div>対応ブラウザでMetaMaskのインストールをお願いします。</div>
          <div>またiOS/AndroidはMetaMaskのブラウザからアクセスしてください。</div>
          <div>
            Chrome:{" "}
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja">
              Chrome MetaMaskインストールページ
            </a>
          </div>
          <div>
            Firefox:{" "}
            <a href="https://addons.mozilla.org/ja/firefox/addon/ether-metamask/">FireFox MetaMaskインストールページ</a>
          </div>
          <div>
            iOS:{" "}
            <a href="https://apps.apple.com/jp/app/metamask-blockchain-wallet/id1438144202">
              iOS MetaMaskインストールページ
            </a>
          </div>
          <div>
            Android:{" "}
            <a href="https://play.google.com/store/apps/details?id=io.metamask&hl=ja&gl=US">
              Android MetaMaskインストールページ
            </a>
          </div>
        </div>
      </Modal>
    </Paper>
  )
}
