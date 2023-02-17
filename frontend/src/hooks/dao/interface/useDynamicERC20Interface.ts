export type useDynamicERC20Interface = () => {
    loadTokenSymbol: (address: string) => Promise<string>,
    loadTokenName: (address: string) => Promise<string>,
}