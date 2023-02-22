import * as functions from "firebase-functions";
import { DAOHistory } from "../class/DAOHistory";
import { DaoInfo } from "../types/dao/DaoInfo";

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
      const daoHistory = new DAOHistory();
      const response: string | DaoInfo = await daoHistory.getDaoInfo(
        requestData.daoId
      );
      res.status(200).send(response);
    }
  });
