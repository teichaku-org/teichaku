export type useERC20Interface = (props: {
    contractAddress: string
}) => {
    load: () => Promise<void>,
    tokenName: string,
    tokenSymbol: string,
    tokenTotalSupply: number,
}