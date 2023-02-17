import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { useState, useEffect } from "react";

const web3AuthClientId = "BO-TLx2RF9Z8C5oAU0DNi0QS6-aRhlo20dJR-zNCvoVkQDKxD6gRpiuyb7aT17d0kMjy4ud_C2_t8QTbNolbo8Y" // TODO:環境変数化

export default () => {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    useEffect(() => {
        const init = async () => {

            const web3auth = new Web3Auth({
                clientId: web3AuthClientId,
                web3AuthNetwork: "testnet",
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId: process.env.NEXT_PUBLIC_EXPECTED_NETWORK_CHAIN_ID,
                    rpcTarget: process.env.NEXT_PUBLIC_EXPECTED_NETWORK_RPC_URL
                },
            });

            setWeb3auth(web3auth);

            await web3auth.initModal();
            if (web3auth.provider) {
                setProvider(web3auth.provider);
            }

        };

        init();
    }, []);

    const login = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
    };

    const getUserInfo = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const user = await web3auth.getUserInfo();
        console.log(user);
    };

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        setProvider(null);
    };



    const loggedInView = (
        <>
            <button onClick={getUserInfo} className="card">
                Get User Info
            </button>
            <button onClick={logout} className="card">
                Log Out
            </button>

            <div id="console" style={{ whiteSpace: "pre-line" }}>
                <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
        </>
    );

    const unloggedInView = (
        <button onClick={login} className="card">
            Login
        </button>
    );

    return {
        loggedInView,
        unloggedInView
    }
}