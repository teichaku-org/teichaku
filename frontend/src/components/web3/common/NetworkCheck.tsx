import { AppInfo } from "@/constants/AppInfo"
import { useLocale } from "@/i18n/useLocale"
import { Box, Button, Modal, Text } from "@mantine/core"
import useEth from "../../../hooks/web3/useEth"
import { MetamaskCheck } from "./MetamaskCheck"

const NetworkCheck = (props: { isWeb3: boolean }) => {
  const { network } = useEth(props.isWeb3)
  const { t } = useLocale()
  const expectedNetwork = process.env.NEXT_PUBLIC_EXPECTED_NETWORK
  const expectedNetworkChainId = process.env.NEXT_PUBLIC_EXPECTED_NETWORK_CHAIN_ID
  const expectedRpcUrl = process.env.NEXT_PUBLIC_EXPECTED_RPC_URL
  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const chengeNetworkRequest = async () => {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: expectedNetworkChainId }],
      })
      window.location.reload()
    } catch (e: any) {
      await (window as any).ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: expectedNetworkChainId,
            chainName: expectedNetwork,
            rpcUrls: [expectedRpcUrl],
          },
        ],
      })
      window.location.reload()
    }
  }

  if (!isMetaMaskInstalled()) {
    return <MetamaskCheck isWeb3={props.isWeb3} />
  }
  if (network && expectedNetwork) {
    return (
      <Modal
        opened={network !== expectedNetwork}
        onClose={() => {}}
        withCloseButton={false}
        centered
        radius="md"
        shadow="xl"
        title={t.Common.NetworkCheck.Title}
      >
        <Text>
          {t.Common.NetworkCheck.Text(AppInfo.name, expectedNetwork)}
          <br />
        </Text>
        <Box my="lg" />
        <Button onClick={chengeNetworkRequest}>{t.Button.ChangeNetwork(expectedNetwork)}</Button>
      </Modal>
    )
  }

  return <div />
}

export default NetworkCheck
