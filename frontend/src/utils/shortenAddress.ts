export const shortenAddress = (address: string) => {
    // 最初の6文字と末尾の4文字を残して、それ以外を...で置き換える
    return address.slice(0, 6) + '...' + address.slice(-4);
}
