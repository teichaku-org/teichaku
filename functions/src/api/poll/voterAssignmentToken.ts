import * as functions from "firebase-functions"
import { Poll } from "../../contracts/Poll"
import { getUserAddress } from "../../utils/decodeJwt"

export const voterAssignmentToken = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
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
    const requestData: {
      daoId: string
      projectId: string
    } = req.body
    const poll = new Poll(requestData.daoId, requestData.projectId, sender)
    const response: number = await poll.VOTER_ASSIGNMENT_TOKEN().get()
    res.status(200).send({ voterAssignmentToken: response })
  }
})
