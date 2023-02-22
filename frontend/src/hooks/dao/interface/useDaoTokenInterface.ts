export type useDaoTokenInterface = (props: { daoId: string; projectId: string }) => {
  load: () => Promise<void>
  tokenName: string
  tokenSymbol: string
  tokenTotalSupply: number
  yourBalance: number
  contractAddress: string
  treasuryBalance: number
  sendToken: (to: string, amount: number) => Promise<void>
}

export type useDaoTokenInterfaceIsWeb3 = (
  props: {
    daoId: string
    projectId: string
  },
  isWeb3: boolean
) => {
  load: () => Promise<void>
  tokenName: string
  tokenSymbol: string
  tokenTotalSupply: number
  yourBalance: number
  contractAddress: string
  treasuryBalance: number
  sendToken: (to: string, amount: number) => Promise<void>
}
