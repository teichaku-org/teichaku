import * as admin from "firebase-admin"

admin.initializeApp()

import { createDao } from "./api/createDao"
import { getDaoInfo } from "./api/daoHistory/getDaoInfo"
import { getIsWeb3 } from "./api/isWeb3/getIsWeb3"
import { getPollDetail } from "./api/poll/getPollDetail"
import { candidateToCurrentPoll } from "./api/poll/candidateToCurrentPoll"
import { vote } from "./api/poll/vote"
import { settleCurrentPollAndCreateNewPoll } from "./api/poll/settleCurrentPollAndCreateNewPoll"
import { getDaoHistory } from "./api/getDaoHistory"
import { getDaoAssessments } from "./api/getDaoAssessments"
import { addDao } from "./api/daoHistory/addDao"
import { currentMaxPollId } from "./api/poll/currentMaxPollId"
import { getCommissionToken } from "./api/poll/getCommissionToken"
import { contributorAssignmentToken } from "./api/poll/contributorAssignmentToken"
import { voterAssignmentToken } from "./api/poll/voterAssignmentToken"
import { getMyBalance } from "./api/token/getMyBalance"
import { setAssignmentToken } from "./api/setting/setAssignmentToken"
import { changePerspective } from "./api/setting/changePerspective"
import { setVotingDuration } from "./api/setting/setVotingDuration"
import { setStartTimeStamp } from "./api/setting/setStartTimeStamp"
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
  currentMaxPollId,
  getCommissionToken,
  contributorAssignmentToken,
  voterAssignmentToken,
  getMyBalance,
  setAssignmentToken,
  changePerspective,
  setVotingDuration,
  setStartTimeStamp,
  test,
}
