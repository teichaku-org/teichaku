import * as functions from "firebase-functions"
import { Token } from "../../contracts/Token"
import { getUserAddress } from "../../utils/decodeJwt"

export const getMyBalance = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const requestData: {
      daoId: string
    } = req.body
    const userId = getUserAddress(req.headers.authorization || "")
    const sender = userId || ""
    const token = new Token(requestData.daoId)
    const response: number = await token.balances(sender).get()
    res.status(200).send({ amount: response })
  }
})
