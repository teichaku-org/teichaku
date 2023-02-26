import * as functions from "firebase-functions"
import { DAOLauncher } from "../contracts/DAOLauncher"
import * as admin from "firebase-admin"

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
      contributorReward: number
      reviewerReward: number
      votingDuration: number
    } = req.body
    console.log({ requestData })
    const sender = "TestUser" //TODO: 本当はログインユーザーのアドレスを使う
    const daoLauncher = new DAOLauncher(sender)
    await daoLauncher.createDao(
      requestData.daoId,
      requestData.projectId,
      requestData.name,
      requestData.description,
      requestData.website,
      requestData.logo,
      requestData.tokenAddress,
      requestData.contributorReward,
      requestData.reviewerReward,
      requestData.votingDuration
    )

    //isWeb3をFalseにする
    const migrationUserRef = admin.firestore().collection("isWeb3").doc(requestData.daoId)
    await migrationUserRef.set({ isWeb3: false })

    res.status(200).send({ message: "success" })
  }
})
