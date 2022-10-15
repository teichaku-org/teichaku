export const shortenUrl = (url: string, num: number = 40) => {
    // urlの文字数がnum文字以上の場合、20文字目までを切り取り、末尾に...を付与する
    if (url.length > num) {
        return url.slice(0, num) + '...';
    }
    return url;
}
