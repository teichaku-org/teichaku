import * as admin from "firebase-admin"
import { Assessment } from "../struct/assessment/Assessment"
import { DAOHistoryItem } from "../struct/dao/DAOHistoryItem"
import { ContributionItem } from "../struct/poll/ContributionItem"
import { DetailPollItem } from "../struct/poll/DetailPollItem"
import { Vote } from "../struct/poll/Vote"
import { DAOHistory } from "./DAOHistory"
import { Token } from "./Token"
import { FieldValue } from "firebase-admin/firestore"

export class Poll {
  // DAO ID
  private daoId: string
  // Project Id
  private projectId: string
  // Poll Address
  private pollAddress: string
  // msg.sender
  private sender: string

  // Constructor
  constructor(daoId: string, projectId: string, sender: string) {
    this.daoId = daoId
    this.projectId = projectId

    this.sender = sender

    //TODO: 本来はdaoHistoryから紐づいているpollAddressを取得する
    this.pollAddress = daoId //一時的にdaoIdをpollAddressとして扱っている

    //↓初期値の登録はinit関数で行う
  }

  async init() {
    const currentMaxPollId = 1
    const activePerspective = 1
    this.startTime(currentMaxPollId).set(new Date().getTime())
    this.endTime(currentMaxPollId).set(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    this.votingDuration(currentMaxPollId).set(7 * 24 * 60 * 60 * 1000)
    this.perspectives(activePerspective).set(["Planning", "Execution", "Improvement"])
    this.currentMaxPollId().set(currentMaxPollId)
    this.activePerspective().set(activePerspective)
    this.CONTRIBUTOR_ASSIGNMENT_TOKEN().set(7000)
    this.VOTER_ASSIGNMENT_TOKEN().set(3000)
  }

  // Pollを開始したり終了するなどの権限
  // Role to start and end a Poll etc
  POLL_ADMIN_ROLE = "POLL_ADMIN_ROLE"

  // Poll Id
  currentMaxPollId() {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .get()
        .then((r) => {
          return r.data()?.currentMaxPollId
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .set({ currentMaxPollId: value }, { merge: true })
    }

    const increment = async () => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .update({ currentMaxPollId: FieldValue.increment(1) })
    }

    return { get, set, increment }
  }

  // 配布するDAOトークンのアドレス
  // DAO token address to distribute
  daoTokenAddress = "NOT_USED"

  // 投票するのに必要なNFT(SBT)のアドレス
  // NFT address required to vote
  nftAddress = "NOT_USED"

  // 投票結果等を保存するDAO履歴のアドレス
  // DAO History address
  daoHistoryAddress = "NOT_USED"

  // Commissionを受け取るアドレス
  // Address to receive Commission
  commissionAddress = "NOT_USED"

  // 立候補者(貢献者)に割り当てられるDAOトークンの総数
  // total amount of DAO tokens to be distributed to candidates(contributors)
  CONTRIBUTOR_ASSIGNMENT_TOKEN() {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .get()
        .then((r) => {
          return r.data()?.contributorAssignmentToken
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .set({ contributorAssignmentToken: value }, { merge: true })
    }

    return { get, set }
  }

  // 投票者に割り当てられるDAOトークンの総数
  // total amount of DAO tokens to be distributed to voters
  VOTER_ASSIGNMENT_TOKEN() {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .get()
        .then((r) => {
          return r.data()?.voterAssignmentToken
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .set({ voterAssignmentToken: value }, { merge: true })
    }

    return { get, set }
  }

  // 投票時に参加できる人数
  // maximum number of people who can participate in voting

  VOTE_MAX_PARTICIPANT = 100

  // 手数料率
  // commission rate
  COMMISSION_RATE = 5

  // 立候補者のリスト
  // list of candidates
  // pollId => [candidate1, candidate2, ...]
  candidates(pollId: number) {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("candidates")
        .get()
        .then((r) => {
          return r.data()?.candidates || []
        })
    }

    const push = async (value: string) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("candidates")
        .set({ candidates: FieldValue.arrayUnion(value) }, { merge: true })
    }

    return { get, push }
  }

  // 立候補者の貢献リスト
  // list of candidates
  //pollId => [contribution1, contribution2, ...]
  contributions(pollId: number) {
    const push = async (item: ContributionItem) => {
      const prev = await get()
      await set([...prev, item])
    }

    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("contributions")
        .get()
        .then((r) => {
          return (r.data()?.contributions as ContributionItem[]) || []
        })
    }

    const set = async (value: ContributionItem[]) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("contributions")
        .set({ contributions: value }, { merge: true })
    }

    return { push, get, set }
  }

  // 投票のリスト
  // list of vote
  // pollId => [vote1, vote2, ...]
  votes(pollId: number) {
    const push = async (value: Vote) => {
      const prev = await get()
      await set([...prev, value])
    }

    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("votes")
        .get()
        .then((r) => {
          return (r.data()?.votes as Vote[]) || []
        })
    }

    const set = async (value: Vote[]) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("votes")
        .set({ votes: value }, { merge: true })
    }

    return { push, get, set }
  }

  // 投票の開始時間
  // Start-time of polls
  // pollId => startTime
  startTime(pollId: number) {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("startTime")
        .get()
        .then((r) => {
          return r.data()?.startTime
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("startTime")
        .set({ startTime: value }, { merge: true })
    }

    return { get, set }
  }

  // 投票期間
  // Voting duration
  // pollId => duration
  votingDuration(pollId: number) {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("votingDuration")
        .get()
        .then((r) => {
          return r.data()?.votingDuration
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("votingDuration")
        .set({ votingDuration: value }, { merge: true })
    }

    return { get, set }
  }

  // 投票の終了時間
  // End-time of polls
  // pollId => endTime
  endTime(pollId: number) {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("endTime")
        .get()
        .then((r) => {
          return r.data()?.endTime
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection(pollId.toString())
        .doc("endTime")
        .set({ endTime: value }, { merge: true })
    }

    return { get, set }
  }

  // 投票観点
  // perspective
  // perspectiveId => perspective
  perspectives(perspectiveId: number) {
    const get = async () => {
      return await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection("perspectives")
        .doc(perspectiveId.toString())
        .get()
        .then((r) => {
          return r.data()?.perspectives
        })
    }

    const set = async (value: string[]) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .collection("perspectives")
        .doc(perspectiveId.toString())
        .set({ perspectives: value }, { merge: true })
    }

    return { get, set }
  }

  // アクティブな投票観点ID
  // active perspective id
  activePerspective() {
    const get = async () => {
      return admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .get()
        .then((r) => {
          return r.data()?.activePerspective || 1
        })
    }

    const set = async (value: number) => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .set({ activePerspective: value }, { merge: true })
    }

    const increment = async () => {
      await admin
        .firestore()
        .collection("polls")
        .doc(this.pollAddress)
        .update({ activePerspective: FieldValue.increment(1) })
    }

    return { get, set, increment }
  }

  setDaoHistoryAddress() {
    throw new Error("NOT IMPLEMENTED")
  }

  setPollAdminRole() {
    throw new Error("NOT IMPLEMENTED")
  }

  async changePerspective(perspectiveTexts: string[]) {
    const activePerspectiveId = await this.activePerspective().get()
    await this.activePerspective().increment()
    await this.perspectives(activePerspectiveId + 1).set(perspectiveTexts)
  }

  setTokenAddress() {
    throw new Error("NOT IMPLEMENTED")
  }

  async setAssignmentToken(_contributorToken: number, _voterToken: number) {
    await this.CONTRIBUTOR_ASSIGNMENT_TOKEN().set(_contributorToken)
    await this.VOTER_ASSIGNMENT_TOKEN().set(_voterToken)
  }

  setVoteMaxParticipant() {
    throw new Error("NOT IMPLEMENTED")
  }

  async setVotingDuration(pollId: number, _votingDuration: number) {
    await this.votingDuration(pollId).set(_votingDuration)
    const startTime = await this.startTime(pollId).get()
    await this.endTime(pollId).set(startTime + _votingDuration)
  }

  async setStartTimeStamp(pollId: number, _startTimeStamp: number) {
    await this.startTime(pollId).set(_startTimeStamp)
    const votingDuration = await this.votingDuration(pollId).get()
    await this.endTime(pollId).set(_startTimeStamp + votingDuration)
  }

  async candidateToCurrentPoll(contributionText: string, evidences: string[], roles: string[]) {
    let updateIndex = undefined
    const currentMaxPollId = await this.currentMaxPollId().get()
    console.log("currentMaxPollId", currentMaxPollId)
    const currentCandidates = await this.candidates(currentMaxPollId).get()
    console.log("currentCandidates", currentCandidates)
    for (let index = 0; index < currentCandidates.length; index++) {
      if (currentCandidates[index] == this.sender) {
        updateIndex = index
        break
      }
    }
    console.log("updateIndex", updateIndex)

    if (updateIndex == undefined) {
      console.log("candidates push")
      await this.candidates(currentMaxPollId).push(this.sender)
      const contributionItem: ContributionItem = {
        contributionText,
        evidences,
        roles,
        contributor: this.sender,
        pollId: currentMaxPollId,
      }
      console.log("contributionItem", contributionItem)
      console.log("contributions push")
      await this.contributions(currentMaxPollId).push(contributionItem)
    } else {
      const _prevContributions = await this.contributions(currentMaxPollId).get()
      const contributionItem: ContributionItem = {
        contributionText,
        evidences,
        roles,
        contributor: this.sender,
        pollId: currentMaxPollId,
      }
      _prevContributions[updateIndex] = contributionItem
      await this.contributions(currentMaxPollId).set(_prevContributions)
    }
  }

  isEligibleToVote(_address: string) {
    //TODO: 誰でも投票可能状態になっているので適切な権限設定を行う
    return true
  }

  /**
   * @notice vote to the current poll.
   * @dev Voters assign points to candidates and register their votes.
   * Points are normalized to a total of 100 points.
   * A voted point for oneself will always be 0.
   */
  async vote(_pollId: number, _candidates: string[], _points: number[][], _comments: string[]): Promise<boolean> {
    const voters: string[] = await this.getVoters(_pollId)
    console.log("voters", voters)
    // Check if the voter is eligible to vote
    if (!this.isEligibleToVote(this.sender)) {
      throw new Error("Not eligible to vote.")
    }

    console.log("_candidates", _candidates)
    console.log("_points", _points)
    // Check if the candidate is not empty
    if (_candidates.length == 0) {
      throw new Error("Candidates empty.")
    }

    // Check if the points and candidates are the same length
    if (_points.length != _candidates.length) {
      throw new Error("invalid points")
    }
    // Firebaseでは2次元配列が保存できないため、number[][]型を { contributor: string; point: number[] }[]型に変換して保存する
    let _pointsObject: { contributor: string; point: number[] }[] = []

    const activePerspective = await this.activePerspective().get()
    console.log("activePerspective", activePerspective)
    const perspectives = await this.perspectives(activePerspective).get()
    console.log("perspectives", perspectives)
    const candidates = await this.candidates(_pollId).get()
    console.log("candidates", candidates)
    for (let index = 0; index < _candidates.length; index++) {
      // Check if the candidate is in the current poll
      if (!candidates.includes(_candidates[index])) {
        throw new Error("Invalid candidate")
      }

      // Check if the points are valid
      for (let i = 0; i < perspectives.length; i++) {
        if (_points[index][i] < 0) {
          throw new Error("Invalid points")
        }
        // A voted point for oneself will always be 0.
        if (_candidates[index] === this.sender) {
          _points[index][i] = 0
        }
      }

      _pointsObject.push({ contributor: _candidates[index], point: _points[index] })
    }

    console.log("_pointsObject", _pointsObject)
    // Check if the voter has already voted
    let voterIndex = this.VOTE_MAX_PARTICIPANT + 1
    for (let index = 0; index < voters.length; index++) {
      if (voters[index] == this.sender) {
        voterIndex = index
      }
    }
    console.log("voterIndex", voterIndex)

    const _vote: Vote = {
      voter: this.sender,
      candidates: _candidates,
      points: _pointsObject,
      comments: _comments,
      perspectiveId: activePerspective,
    }

    if (voterIndex == this.VOTE_MAX_PARTICIPANT + 1) {
      // save the vote to the list of votes
      console.log("votes push")
      await this.votes(_pollId).push(_vote)
    } else {
      // update the vote to the list of votes
      console.log("votes update")
      const _prevVotes = await this.votes(_pollId).get()
      _prevVotes[voterIndex] = _vote
      await this.votes(_pollId).set(_prevVotes)
    }

    return true
  }

  async settleCurrentPollAndCreateNewPoll() {
    //TODO: 終了時刻前は締め切りができないようにする
    await this._settlePoll()
    await this._createPoll()
  }

  async _settlePoll() {
    // Add up votes for each candidate
    console.log("settlePoll")
    const currentMaxPollId = await this.currentMaxPollId().get()
    console.log("currentMaxPollId", currentMaxPollId)
    const _candidates: string[] = await this.candidates(currentMaxPollId).get()
    console.log("_candidates", _candidates)
    const _votes: Vote[] = await this.votes(currentMaxPollId).get()
    console.log("_votes", _votes)
    const activePerspective = await this.activePerspective().get()
    console.log("activePerspective", activePerspective)
    const _perspectives: string[] = await this.perspectives(activePerspective).get()
    console.log("_perspectives", _perspectives)

    // Aggregated data for each candidate
    const candidatesAssessments: Assessment[][] = new Array(_candidates.length)
    // Aggregate score data (total score for each viewpoint)
    const summedPoints: number[] = new Array(_candidates.length).fill(0)

    for (let c = 0; c < _candidates.length; c++) {
      candidatesAssessments[c] = new Array<Assessment>(_votes.length)
      for (let v = 0; v < _votes.length; v++) {
        //Skip vote whose perspective is not the latest
        if (_votes[v].perspectiveId != activePerspective) {
          continue
        }
        //Skip vote for oneself
        if (_votes[v].voter == _candidates[c]) {
          continue
        }

        candidatesAssessments[c][v] = {
          voter: _votes[v].voter,
          contributor: _candidates[c],
          perspectiveId: activePerspective,
          points: _votes[v].points.find((p) => p.contributor === _candidates[c])?.point as number[],
          comment: _votes[v].comments[c],
          pollId: currentMaxPollId,
        }

        for (let p = 0; p < _perspectives.length; p++) {
          if (_votes[v].candidates[c] == _candidates[c]) {
            summedPoints[c] += _votes[v].points[c].point[p]
          }
        }
      }
    }
    console.log("candidatesAssessments", candidatesAssessments)
    console.log("summedPoints", summedPoints)

    // Calculate the total score
    let totalPoints = 0
    for (let index = 0; index < summedPoints.length; index++) {
      const points = summedPoints[index]
      totalPoints = totalPoints + points
    }

    console.log("totalPoints", totalPoints)
    if (totalPoints === 0) {
      return
    }

    // Decide how much to distribute to Contributors
    const assignmentToken: number[] = new Array<number>(_candidates.length)
    const CONTRIBUTOR_ASSIGNMENT_TOKEN = await this.CONTRIBUTOR_ASSIGNMENT_TOKEN().get()
    for (let index = 0; index < _candidates.length; index++) {
      const points = summedPoints[index]
      const token = (points * CONTRIBUTOR_ASSIGNMENT_TOKEN) / totalPoints
      assignmentToken[index] = token
    }
    console.log("assignmentToken", assignmentToken)

    await this.transferTokenForContributor(_candidates, assignmentToken)
    // TODO:  _transferTokenForCommission();

    // Decide how much to distribute to voters
    const _voters = await this.getVoters(currentMaxPollId)
    const totalVoterCount = _voters.length
    const VOTER_ASSIGNMENT_TOKEN = await this.VOTER_ASSIGNMENT_TOKEN().get()
    if (totalVoterCount > 0) {
      const voterAssignmentToken = VOTER_ASSIGNMENT_TOKEN / totalVoterCount
      console.log("voterAssignmentToken", voterAssignmentToken)
      await this.transferTokenForVoter(_voters, voterAssignmentToken)
    }

    //Save aggregation results in DAO History
    console.log("Save aggregation results in DAO History")
    const daoHistory = new DAOHistory("NOT_USED", this.sender)
    for (let c = 0; c < _candidates.length; c++) {
      const contributionItem = (await this.contributions(currentMaxPollId).get())[c]
      console.log("contributionItem", contributionItem)
      const daoHistoryItem: DAOHistoryItem = {
        contributionText: contributionItem.contributionText,
        reward: assignmentToken[c],
        rewardToken: "pt",
        roles: contributionItem.roles,
        timestamp: new Date().getTime(),
        contributor: _candidates[c],
        pollId: currentMaxPollId,
        evidences: contributionItem.evidences,
      }
      console.log("daoHistoryItem", daoHistoryItem)
      await daoHistory.addDaoHistory(this.daoId, this.projectId, daoHistoryItem)
      console.log("candidatesAssessments[c]", candidatesAssessments[c])
      await daoHistory.addAssessment(this.daoId, this.projectId, candidatesAssessments[c])
    }
  }

  /**
   * @notice start new poll
   */
  async _createPoll() {
    await this.currentMaxPollId().increment()
    const currentMaxPollId = await this.currentMaxPollId().get()
    const prevEndTime = await this.endTime(currentMaxPollId - 1).get()
    const votingDuration = await this.votingDuration(currentMaxPollId - 1).get()
    await this.startTime(currentMaxPollId).set(prevEndTime)
    await this.endTime(currentMaxPollId).set(prevEndTime + votingDuration)
    await this.votingDuration(currentMaxPollId).set(votingDuration)
  }

  _transferTokenForCommission() {
    throw new Error("Not implemented")
  }

  async transferTokenForContributor(to: string[], amount: number[]): Promise<void> {
    if (to.length !== amount.length) {
      throw new Error("to != amount")
    }
    const token = new Token(this.daoId)
    for (let index = 0; index < to.length; index++) {
      await token.transfer(to[index], amount[index])
    }
  }

  async transferTokenForVoter(to: string[], amount: number): Promise<void> {
    const token = new Token(this.daoId)
    for (let index = 0; index < to.length; index++) {
      await token.transfer(to[index], amount)
    }
  }

  async getCurrentCandidates() {
    const currentMaxPollId = await this.currentMaxPollId().get()
    return await this.candidates(currentMaxPollId).get()
  }

  async getCurrentVotes() {
    const currentMaxPollId = await this.currentMaxPollId().get()
    return await this.votes(currentMaxPollId).get()
  }

  async getVotes(pollId: number) {
    return await this.votes(pollId).get()
  }

  async getCurrentPerspectives() {
    const activePerspectiveId = await this.activePerspective().get()
    return await this.perspectives(activePerspectiveId).get()
  }

  /**
   * @notice get the current poll's voters
   */
  async getVoters(pollId: number): Promise<string[]> {
    const _votes = await this.votes(pollId).get()
    console.log("_votes", _votes)
    const _voters: string[] = []
    _votes.forEach((vote) => {
      _voters.push(vote.voter)
    })
    return _voters
  }

  async getPollDetail(_pollId: number) {
    const _contributions = await this.contributions(_pollId).get()
    const _voters = await this.getVoters(_pollId)
    const _startTimeStamp = await this.startTime(_pollId).get()
    const _endTimeStamp = await this.endTime(_pollId).get()
    const _perspectives = await this.getCurrentPerspectives()

    // DetailPollItemを作成
    const _detailPollItem: DetailPollItem = {
      pollId: _pollId,
      contributions: _contributions,
      voters: _voters,
      startTime: _startTimeStamp,
      endTime: _endTimeStamp,
      perspectives: _perspectives,
    }
    return _detailPollItem
  }

  async getPerspectives(_pollId: number): Promise<string[]> {
    return await this.perspectives(_pollId).get()
  }

  getCommissionToken() {
    throw new Error("Not implemented")
  }
}
