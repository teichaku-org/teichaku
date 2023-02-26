import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

export const test = functions.https.onRequest(async (req, res) => {
  const requestData = req.body

  await admin.firestore().collection("messages").add({
    message: requestData.message,
    createdAt: FieldValue.serverTimestamp(),
  })

  res.status(200).send({ message: requestData.message })
})
