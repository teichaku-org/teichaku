import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const getIsWeb3 = functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
      // Send response to OPTIONS requests
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
      res.status(204).send("");
    } else {
      const requestData = req.body;

      let response: boolean | string = "";

      let docRef = admin.firestore().collection("daos").doc(requestData.daoId);

      let doc = await docRef.get();

      if (doc.exists) {
        response = doc.data()?.isWeb3;
      } else {
        response = "No such a document!";
      }
      res.status(200).send(response);
    }
  });
