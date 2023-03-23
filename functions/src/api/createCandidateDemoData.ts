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
        contributionText: "車両の設計や安全装置の開発、予約システムの構築など、技術面でのサポートを行いました。",
        roles: ["Engineer"],
        evidences: [],
        sender: "0x261f350466E17cbDf9Bc00E2B3875685EF9aB07C",
      },
      {
        contributionText: "データ分析を行い、運行スケジュールやルートの最適化を検討しました。",
        roles: ["Data Scientist"],
        evidences: [],
        sender: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
      },
      {
        contributionText: "事業の資金調達や戦略的な成長計画を立案し、サービスの拡大に貢献しました。",
        roles: ["Product Manager"],
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
