export type useDynamicERC20Interface = (isWeb3: boolean) => {
  loadTokenSymbol: (address: string) => Promise<string>
  loadTokenName: (address: string) => Promise<string>
}
