export type useERC20Interface = (
  props: {
    contractAddress: string
  },
  isWeb3: boolean
) => {
  load: () => Promise<void>
  tokenName: string
  tokenSymbol: string
  tokenTotalSupply: number
}
