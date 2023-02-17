import { Contract, ethers } from "ethers";
import artifact from "../../../abi/token/DAOToken.sol/DAOToken.json";
import { getContract } from "../../web3/useMetaMask";
import { useDynamicERC20Interface } from "../interface/useDynamicERC20Interface";

const useDynamicERC20Web3: useDynamicERC20Interface = () => {
    const loadTokenSymbol = async (address: string) => {
        const contract = getContract(address, artifact.abi) as Contract
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const symbol = await contract.functions.symbol()
        return symbol[0]
    }

    const loadTokenName = async (address: string) => {
        const contract = getContract(address, artifact.abi) as Contract
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const name = await contract.functions.name()
        return name[0]
    }


    return {
        loadTokenSymbol,
        loadTokenName,
    };
}

export default useDynamicERC20Web3