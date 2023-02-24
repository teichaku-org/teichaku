import * as functions from "firebase-functions"
import { DAOLauncher } from "../class/DAOLauncher"

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
      isWeb3: boolean
    } = req.body
    const daoLauncher = new DAOLauncher()
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
      requestData.votingDuration,
      requestData.isWeb3
    )
    res.send({ message: "success" })
  }
})
