import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom";
import { useAtom } from "jotai";
import { useDynamicERC20Interface } from "./interface/useDynamicERC20Interface";
import useDynamicERC20Web2 from "./web2/useDynamicERC20Web2";
import useDynamicERC20Web3 from "./web3/useDynamicERC20Web3";

const useDynamicERC20: useDynamicERC20Interface = () => {
    const [isWeb3] = useAtom(Web3FlagAtom)
    const selectStrategy = () => {
        if (isWeb3) {
            return useDynamicERC20Web3()
        } else {
            return useDynamicERC20Web2()
        }
    }
    const strategy = selectStrategy()

    return strategy
};

export default useDynamicERC20