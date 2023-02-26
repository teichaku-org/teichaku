import { WalletAddressAtom } from "@/domains/atoms/WalletAddressAtom"
import { Web3AuthAtom, ProviderAtom } from "@/domains/atoms/Web3FlagAtom"
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base"
import { Web3Auth } from "@web3auth/modal"
import { useAtom } from "jotai"
import { useState, useEffect } from "react"

const web3AuthClientId = "BO-TLx2RF9Z8C5oAU0DNi0QS6-aRhlo20dJR-zNCvoVkQDKxD6gRpiuyb7aT17d0kMjy4ud_C2_t8QTbNolbo8Y" // TODO:環境変数化

export default () => {
    const [web3auth, setWeb3auth] = useAtom(Web3AuthAtom)
    const [provider, setProvider] = useAtom(ProviderAtom)
    const [user, setUser] = useState<Partial<UserInfo>>()
    const [address, setAddress] = useAtom(WalletAddressAtom)

    useEffect(() => {
        // web3authの初期化
        const init = async () => {
            const _web3auth = new Web3Auth({
                clientId: web3AuthClientId,
                web3AuthNetwork: "testnet",
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId: process.env.NEXT_PUBLIC_EXPECTED_NETWORK_CHAIN_ID,
                    rpcTarget: process.env.NEXT_PUBLIC_EXPECTED_NETWORK_RPC_URL,
                },
            })
            if (!web3auth) {
                setWeb3auth(_web3auth)
                await _web3auth.initModal()
            }
            if (_web3auth.provider) {
                setProvider(_web3auth.provider)
            }
        }

        init()
    }, [])

    const login = async () => {
        // モーダルを開いてログインを要求する。
        if (!web3auth) {
            console.log("web3auth not initialized yet")
            return
        }
        const web3authProvider = await web3auth.connect()
        setProvider(web3authProvider)

        //ログインのタイミングでアドレスを取得している
        getAddress()
    }

    // idTokenを取得する(Headerに付与してバックエンドで認証する)
    const getUserIdToken = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet")
            return
        }
        try {
            const user = await web3auth.authenticateUser()
            return user.idToken
        } catch (e) {
            console.log(e)
            return null
        }
    }

    // idTokenを取得し、walletAddressもしくはpublic_key(SNSログイン)を取得する
    const getAddress = async () => {
        const decodeJwt = (token: string) => {
            if (!token) return null
            const base64Url = token.split(".")[1]
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            return JSON.parse(decodeURIComponent(escape(window.atob(base64))))
        }

        const idToken = await getUserIdToken()
        const decoded = decodeJwt(idToken || "")
        const wallets = decoded?.wallets
        if (!wallets) {
            console.log("wallets not found1")
            return null
        }
        if (wallets.length == 0) {
            console.log("wallets not found2")
            return null
        }
        const public_key = wallets[0].public_key
        const walletAddress = wallets[0].address
        setAddress(walletAddress || public_key)
    }

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet")
            return
        }
        await web3auth.logout()
        setProvider(null)
        setAddress(null)
    }

    return {
        login,
        logout,
        user,
        address: address || "",
        getUserIdToken,
    }
}
