import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

export const getIsWeb3 = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    type RequestData = {
      daoId: string
    }
    const requestData: RequestData = req.body
    const db = admin.firestore()
    const daoRef = db.collection("isWeb3").doc(requestData.daoId)
    const dao = await daoRef.get()
    if (dao.exists) {
      const data = dao.data()
      const isWeb3 = data?.isWeb3 || true
      res.status(200).send({
        isWeb3,
      })
    } else {
      res.status(200).send({
        isWeb3: true,
      })
    }
  }
})
