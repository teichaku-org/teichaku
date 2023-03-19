import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { GasFreeClient } from "../../utils/GasFreeClient"
import { ethers } from "ethers"
import { Token } from "../../contracts/Token"

export const createToken = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const requestData: {
      daoId: string
    } = req.body

    try {
      const token = new Token(requestData.daoId)
      await token.createToken()
    } catch (e) {
      res.status(500).send({ message: "failed" })
    }

    res.status(200).send({ message: "success" })
  }
})
