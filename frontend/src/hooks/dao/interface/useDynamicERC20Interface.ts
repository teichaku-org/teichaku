export type useDynamicERC20Interface = (props: {
    contractAddress: string
}) => {
    loadTokenSymbol: (address: string) => Promise<string>,
    loadTokenName: (address: string) => Promise<string>,
}