import * as functions from "firebase-functions"
import { DAOLauncher } from "../contracts/DAOLauncher"

export const createDao = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const requestData: {
      daoId: string
      projectId: string
      name: string
      description: string
      website: string
      logo: string
      tokenAddress: string
      contributorToken: number
      voterToken: number
      votingDuration: number
    } = req.body
    const sender = "TestUser" //TODO: 本当はログインユーザーのアドレスを使う
    const daoLauncher = new DAOLauncher(sender)
    daoLauncher.createDao(
      requestData.daoId,
      requestData.projectId,
      requestData.name,
      requestData.description,
      requestData.website,
      requestData.logo,
      requestData.tokenAddress,
      requestData.contributorToken,
      requestData.voterToken,
      requestData.votingDuration
    )
    res.send({ message: "success" })
  }
})
