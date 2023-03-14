import { useDynamicERC20Interface } from "../interface/useDynamicERC20Interface"

const useDynamicERC20Web2: useDynamicERC20Interface = () => {
  const loadTokenSymbol = async (address: string) => {
    return "pt"
  }

  const loadTokenName = async (address: string) => {
    return "Point"
  }

  return {
    loadTokenSymbol,
    loadTokenName,
  }
}

export default useDynamicERC20Web2
