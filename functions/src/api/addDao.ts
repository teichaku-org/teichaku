import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const addDao = functions
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
      // daoが存在するか確認して

      const requestData: any = req.body;
      await admin
        .firestore()
        .collection("daos")
        .doc(requestData.daoId as string)
        .set(requestData);
      res.send({ message: "success" });
    }
  });
