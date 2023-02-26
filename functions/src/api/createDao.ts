import * as functions from "firebase-functions"
import { DAOLauncher } from "../contracts/DAOLauncher"
// import * as admin from "firebase-admin"

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
    await daoLauncher.createDao(
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

    //isWeb3をFalseにする
    // const daoRef = admin.firestore().collection("isWeb3").doc(requestData.daoId)
    // await daoRef.set({
    //   isWeb3: false,
    // })

    res.status(200).send({ message: "success" })
  }
})
