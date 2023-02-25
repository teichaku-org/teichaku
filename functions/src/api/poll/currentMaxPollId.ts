import * as functions from "firebase-functions"
import { Poll } from "../../contracts/Poll"

export const currentMaxPollId = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
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
    const poll = new Poll(requestData.daoId, requestData.projectId, sender)
    const response: number = await poll.currentMaxPollId().get()
    res.status(200).send({ currentMaxPollId: response })
  }
})
