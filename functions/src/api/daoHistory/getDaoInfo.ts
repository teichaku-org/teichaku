import * as functions from "firebase-functions"
import { DAOHistory } from "../../contracts/DAOHistory"
import { getUserAddress } from "../../utils/decodeJwt"

export const getDaoInfo = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const userId = getUserAddress(req.headers.authorization || "")
    const sender = userId || ""
    type RequestData = { daoId: string }
    const requestData: RequestData = req.body
    const daoHistory = new DAOHistory("NOT_USED", sender)
    const response = await daoHistory.getDaoInfo(requestData.daoId)
    res.status(200).send(response)
  }
})
