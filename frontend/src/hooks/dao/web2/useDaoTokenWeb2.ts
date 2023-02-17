import { PollContractAddress } from "@/domains/atoms/DaoContractAddressAtom";
import { TokenNameAtom, TokenSymbolAtom, TokenTotalSupplyAtom, TreasuryBalanceAtom, YourBalanceAtom } from "@/domains/atoms/TokenAtom";
import { useAtom } from "jotai";
import { useDaoTokenInterface } from "../interface/useDaoTokenInterface";

interface Props {
    daoId: string
    projectId: string
}
const useDaoTokenWeb2: useDaoTokenInterface = (props: Props) => {
    const [tokenName, setTokenName] = useAtom(TokenNameAtom);
    const [tokenSymbol, setTokenSymbol] = useAtom(TokenSymbolAtom);
    const [tokenTotalSupply, setTokenTotalSupply] = useAtom(TokenTotalSupplyAtom);
    const [yourBalance, setYourBalance] = useAtom(YourBalanceAtom);
    const [treasuryBalance, setTreasuryBalance] = useAtom(TreasuryBalanceAtom)
    const [pollAddress] = useAtom(PollContractAddress)
    const contractAddress = ""


    const load = async () => {

    }


    const sendToken = async (to: string, amount: number) => {
    }

    return {
        load,
        tokenName,
        tokenSymbol,
        tokenTotalSupply,
        yourBalance,
        contractAddress,
        treasuryBalance,
        sendToken
    };
}

export default useDaoTokenWeb2;