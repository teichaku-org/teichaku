import * as admin from "firebase-admin"

admin.initializeApp()

import { createDao } from "./api/createDao"
import { addDao } from "./api/daoHistory/addDao"
import { getDaoInfo } from "./api/daoHistory/getDaoInfo"
import { getDaoAssessments } from "./api/getDaoAssessments"
import { getDaoHistory } from "./api/getDaoHistory"
import { getIsWeb3 } from "./api/isWeb3/getIsWeb3"
import { candidateToCurrentPoll } from "./api/poll/candidateToCurrentPoll"
import { contributorAssignmentToken } from "./api/poll/contributorAssignmentToken"
import { currentMaxPollId } from "./api/poll/currentMaxPollId"
import { getCommissionToken } from "./api/poll/getCommissionToken"
import { getPollDetail } from "./api/poll/getPollDetail"
import { settleCurrentPollAndCreateNewPoll } from "./api/poll/settleCurrentPollAndCreateNewPoll"
import { vote } from "./api/poll/vote"
import { voterAssignmentToken } from "./api/poll/voterAssignmentToken"
import { changePerspective } from "./api/setting/changePerspective"
import { setAssignmentToken } from "./api/setting/setAssignmentToken"
import { setStartTimeStamp } from "./api/setting/setStartTimeStamp"
import { setVotingDuration } from "./api/setting/setVotingDuration"
import { getMyBalance } from "./api/token/getMyBalance"
import { getTokenReceiveRights } from "./api/web3Migration/getTokenReceiveRights"
import { migrateDao } from "./api/web3Migration/migrateDao"
import { registerWallet } from "./api/web3Migration/registerWallet"

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
  getTokenReceiveRights,
  migrateDao,
  registerWallet,
}
