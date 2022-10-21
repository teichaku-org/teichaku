import { Box, Button, Modal, Text } from "@mantine/core";
import useEth from "../../../hooks/web3/useEth";
import useMetaMask from "../../../hooks/web3/useMetaMask";
import { MetamaskCheck } from "./MetamaskCheck";

const NetworkCheck = () => {
    const { network } = useEth();
    const { address, login } = useMetaMask()
    const expectedNetwork = process.env.NEXT_PUBLIC_EXPECTED_NETWORK;
    const expectedNetworkChainId = process.env.NEXT_PUBLIC_EXPECTED_NETWORK_CHAIN_ID;
    const isMetaMaskInstalled = () => {
        const { ethereum } = window as any;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    const chengeNetworkRequest = async () => {
        try {
            await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: expectedNetworkChainId }],
            });
            window.location.reload();
        } catch (e: any) {
            await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: expectedNetworkChainId,
                        rpcUrls: [(() => {
                            if (expectedNetwork === "Mumbai") {
                                return "https://rpc-mumbai.maticvigil.com/";
                            } else if (expectedNetwork === "Polygon Mainnet") {
                                return "https://polygon-rpc.com/";
                            } else if (expectedNetwork === "Local") {
                                return "http://localhost:8545";
                            }
                        })()],
                    },
                ],
            });
            window.location.reload();

        }
    }

    if (!isMetaMaskInstalled()) {
        return <MetamaskCheck />
    }
    if (network && expectedNetwork) {
        return <Modal
            opened={(network !== expectedNetwork)}
            onClose={() => { }}
            withCloseButton={false}
            centered
            radius="md"
            shadow="xl"
            title="The currently connected network is not supported."
        >
            <Text>
                DAO History is running on {expectedNetwork}!<br />
            </Text>
            <Box my="lg" />
            <Button onClick={chengeNetworkRequest}>
                Change Network to {expectedNetwork}
            </Button>
        </Modal>
    }



    return <div />


}

export default NetworkCheck;