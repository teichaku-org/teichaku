import * as functions from "firebase-functions"
import { Poll } from "../contracts/Poll"

export const createCandidateDemoData = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET")
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    type RequestData = {
      daoId: string
      projectId: string
    }
    const requestData: RequestData = req.body
    const data = [
      {
        contributionText:
          "SNSログイン周りを実装し、Metamaskを接続しなくてもIDを取得できるようにしてWeb2版がしっかり動くようになった。",
        roles: ["Engineer"],
        evidences: [],
        sender: "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
      },
      {
        contributionText: "スライド作成、メッセージのポイントやすぐにでも使いたいと思う切り口の検討",
        roles: ["PM"],
        evidences: [],
        sender: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
      },
    ]

    for (const d of data) {
      const poll = new Poll(requestData.daoId, requestData.projectId, d.sender)
      await poll.candidateToCurrentPoll(d.contributionText, d.evidences, d.roles)
    }
    res.status(200).send({ message: "success" })
  }
})
