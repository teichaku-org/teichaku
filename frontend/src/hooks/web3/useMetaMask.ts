import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { useLocale } from "@/i18n/useLocale"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  return provider
}

export const getSigner = () => {
  const provider = getProvider()
  const signer = provider.getSigner()
  return signer
}

export const getContractWithSigner = (contractAddress: string, abi: any) => {
  const signer = getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)
  return contract
}

export const getContract = (contractAddress: string, abi: any) => {
  const provider = getProvider()
  const contract = new ethers.Contract(contractAddress, abi, provider)
  return contract
}

export default (isWeb3: boolean) => {
  const [address, setAddress] = useState("")
  const { t } = useLocale()
  const getSignerAddressOrLogin = async () => {
    const address = await getSignerAddress()
    if (!address) {
      await login()
    }
  }

  const getSignerAddress = async () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner()
    try {
      const address = await signer.getAddress()
      setAddress(address)
      return address
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const login = async () => {
    if (!("ethereum" in window)) {
      alert(t.Alert.PleaseInstallMetamask)
      return
    }
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    await provider.send("eth_requestAccounts", [])
  }

  const forceMetamaskLogin = async () => {
    if (!("ethereum" in window)) {
      //TODO: メタマスクをログインしないと使えないようにする
      return
    }
    getSignerAddressOrLogin()

    //TODO: ここでもしログインを拒否られたら？？
  }

  useEffect(() => {
    if (!("ethereum" in window)) {
      console.warn("MetaMask Plugin not found")
      return
    }
    // getSignerAddress();
    getSignerAddressOrLogin()
    ;(window as any).ethereum.on("accountsChanged", (accounts: any) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        // logic to handle what happens once MetaMask is locked
        setAddress("")
      } else {
        getSignerAddress()
      }
    })
  }, [])

  if (!isWeb3) {
    return {
      address: "",
      login: () => {
        console.error("Web2でMetamaskログインが求められています。")
      },
    }
  }
  return { address, login }
}
