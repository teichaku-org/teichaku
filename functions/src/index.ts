import * as admin from "firebase-admin"

admin.initializeApp()

import { createDao } from "./api/createDao"
import { getDaoInfo } from "./api/daoHistory/getDaoInfo"
import { getIsWeb3 } from "./api/getIsWeb3"
import { getPollDetail } from "./api/poll/getPollDetail"
import { candidateToCurrentPoll } from "./api/poll/candidateToCurrentPoll"
import { vote } from "./api/poll/vote"
import { settleCurrentPollAndCreateNewPoll } from "./api/poll/settleCurrentPollAndCreateNewPoll"
import { getDaoHistory } from "./api/getDaoHistory"
import { getDaoAssessments } from "./api/getDaoAssessments"
import { addDao } from "./api/daoHistory/addDao"
import { test } from "./api/test"

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
  addDao,
  test,
}
