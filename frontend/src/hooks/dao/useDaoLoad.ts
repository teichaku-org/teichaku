import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";
import { useAtom } from "jotai";
import { useDaoLoadInterface } from "./interface/useDaoLoadInterface";
import { useDaoLoadWeb2 } from "./web2/useDaoLoadWeb2";
import { useDaoLoadWeb3 } from "./web3/useDaoLoadWeb3";


export const useDaoLoad: useDaoLoadInterface = () => {
    const [isWeb3] = useAtom(Web3FlagAtom)
    const selectStrategy = () => {
        if (isWeb3) {
            return useDaoLoadWeb3()
        } else {
            return useDaoLoadWeb2()
        }
    }
    const strategy = selectStrategy()

    return strategy
}