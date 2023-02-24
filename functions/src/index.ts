import * as admin from "firebase-admin"

admin.initializeApp()

import { createDao } from "./api/createDao"
import { getDaoInfo } from "./api/getDaoInfo"
import { getIsWeb3 } from "./api/getIsWeb3"
import { getPollDetail } from "./api/getPollDetail"
import { candidateToCurrentPoll } from "./api/candidateToCurrentPoll"
import { vote } from "./api/vote"
import { settleCurrentPollAndCreateNewPoll } from "./api/settleCurrentPollAndCreateNewPoll"
import { getDaoHistory } from "./api/getDaoHistory"
import { getDaoAssessments } from "./api/getDaoAssessments"

module.exports = {
  createDao,
  getDaoInfo,
  getIsWeb3,
  getPollDetail,
  candidateToCurrentPoll,
  vote,
  settleCurrentPollAndCreateNewPoll,
  getDaoHistory,
  getDaoAssessments,
}
