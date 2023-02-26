import * as functions from "firebase-functions"
import { DAOHistory } from "../contracts/DAOHistory"
import { Assessment } from "../struct/assessment/Assessment"

export const getDaoAssessments = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const sender = "TestUser" //TODO: 本当はログインユーザーのアドレスを使う
    const requestData: {
      daoId: string
      projectId: string
    } = req.body
    const daoHistory = new DAOHistory("", sender)
    const response: Assessment[] = await daoHistory.getDaoAssessments(requestData.daoId, requestData.projectId)
    res.status(200).send(response)
  }
})
