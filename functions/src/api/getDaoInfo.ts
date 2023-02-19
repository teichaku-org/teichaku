import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const getDaoInfo = functions
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
      console.log(requestData);

      let daosDocRef = await admin
        .firestore()
        .collection("daos")
        .doc(requestData.daoId as string);
      daosDocRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            res.send(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            throw new Error("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          throw new Error("Error getting document");
        });
    }
  });
