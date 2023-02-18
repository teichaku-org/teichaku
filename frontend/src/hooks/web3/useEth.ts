import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useMetaMask from "./useMetaMask";

export default () => {
    const [isWeb3] = useAtom(Web3FlagAtom)
    const [balance, setBalance] = useState(0);
    const [network, setNetwork] = useState("")
    const { address } = useMetaMask()

    const getSigner = () => {
        if (!address) return undefined
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        return provider.getSigner()
    }

    const getNetwork = () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        return provider.getNetwork()
    }

    useEffect(() => {
        refresh()
    }, [address])

    const refresh = async () => {
        getSigner()?.getBalance().then(b => setBalance(Number(ethers.utils.formatEther(b))));
        getNetwork().then(n => {
            if (n.name === "unknown") setNetwork("Local")
            else if (n.name === "maticmum") setNetwork("Polygon Mumbai")
            else if (n.name === "homestead") setNetwork("Ethereum Mainnet")
            else if (n.name === "matic") setNetwork("Polygon Mainnet")
            else if (n.name === "goerli") setNetwork("Ethereum Goerli Testnet")
            else setNetwork(n.name)
        }
        )
    }

    if (!isWeb3) {
        return { balance: 0, network: "" }
    }
    return { balance, network };
}