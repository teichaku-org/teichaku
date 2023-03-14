import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

export const migrateDao = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    type RequestData = { daoId: string }
    const requestData: RequestData = req.body

    //TODO: このDAOでトークンを持つユーザの一覧を取得
    const registerUserList = await admin
      .firestore()
      .collection("Token")
      .doc(requestData.daoId)
      .collection("balances")
      .listDocuments()

    //トークンを持つユーザの一覧をmigrationコレクションに登録
    const batch = admin.firestore().batch()
    for (const u of registerUserList) {
      const amount = await u.get()
      const migrationUserRef = admin
        .firestore()
        .collection("migration")
        .doc(requestData.daoId)
        .collection("balances")
        .doc(u.id)
      batch.set(migrationUserRef, {
        token: amount.data()?.amount || 0,
      })
    }
    await batch.commit()

    // isWeb3をTrueにする
    const daoRef = admin.firestore().collection("isWeb3").doc(requestData.daoId)
    await daoRef.set({
      isWeb3: true,
    })

    res.status(200).send({
      token: "success",
    })
  }
})
