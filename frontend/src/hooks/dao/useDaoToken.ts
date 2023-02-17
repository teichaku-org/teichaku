import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";
import { useAtom } from "jotai";
import { useDaoTokenInterface } from "./interface/useDaoTokenInterface";
import useDaoTokenWeb2 from "./web2/useDaoTokenWeb2";
import useDaoTokenWeb3 from "./web3/useDaoTokenWeb3";

interface Props {
    daoId: string
    projectId: string
}

const useDaoToken: useDaoTokenInterface = (props: Props) => {
    const [isWeb3] = useAtom(Web3FlagAtom)
    const selectStrategy = () => {
        if (isWeb3) {
            return useDaoTokenWeb3(props)
        } else {
            return useDaoTokenWeb2(props)
        }
    }
    const strategy = selectStrategy()

    return strategy
}

export default useDaoToken;