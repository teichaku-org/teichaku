export const decodeJwt = (token: string) => {
  if (!token) return null
  const _token = token.split("Bearer ")[1]
  var base64Url = _token.split(".")[1]
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")

  var encodeURI = encodeURIComponent(atob(base64))
  var decodeString = decodeURIComponent(encodeURI)
  return JSON.parse(decodeString)
}

export const getUserAddress = (token: string) => {
  const decoded = decodeJwt(token)
  const wallets = decoded?.wallets
  if (!wallets) {
    console.log("wallets not found1")
    return null
  }
  if (wallets.length == 0) {
    console.log("wallets not found2")
    return null
  }
  const public_key = wallets[0].public_key
  const walletAddress = wallets[0].address
  return walletAddress || public_key
}
