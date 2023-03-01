import * as functions from "firebase-functions"
import { DAOHistory } from "../../contracts/DAOHistory"
import { getUserAddress } from "../../utils/decodeJwt"

export const addDao = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    type RequestData = {
      daoId: string
      projectId: string
      name: string
      description: string
      website: string
      logo: string
    }
    const userId = getUserAddress(req.headers.authorization || "")
    const sender = userId || ""
    const requestData: RequestData = req.body
    const poll = new DAOHistory("NOT_USED", sender)
    await poll.addDao(
      requestData.daoId,
      requestData.projectId,
      requestData.name,
      requestData.description,
      requestData.website,
      requestData.logo
    )
    res.status(200).send({ message: "success" })
  }
})
