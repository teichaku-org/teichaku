import { APIClient } from "./APIClient"

export const checkWeb3 = async (webType: "check" | "web2" | "web3", daoId: string) => {
  // Fetch data from external API
  if (webType === "check") {
    const apiClient = new APIClient()
    const res = await apiClient.post("/getIsWeb3", { daoId: daoId })
    return res ? res.data.isWeb3 : true
  } else {
    return !(webType === "web2")
  }
}
