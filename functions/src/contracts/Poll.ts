import * as admin from "firebase-admin"
import { ContributionItem } from "../struct/poll/ContributionItem"
import { DetailPollItem } from "../struct/poll/DetailPollItem"
import { Vote } from "../struct/poll/Vote"
import { Assessment } from "../struct/assessment/Assessment"
import { DAOHistory } from "./DAOHistory"
import { DAOHistoryItemWithTimestamp } from "../struct/dao/DAOHistoryItem"
import { PollFactory } from "./PollFactory"

export class Poll {
  private daoId: string
  private projectId: string

  constructor(daoId: string, projectId: string) {
    this.daoId = daoId
    this.projectId = projectId
  }
  VOTE_MAX_PARTICIPANT = 100
  startTimeStamp = new Date()
  endTimeStamp = new Date(new Date().setDate(this.startTimeStamp.getDate() + 14))
  perspective = ["量", "質", "効果"]
  activePerspective = 0
  currentMaxPollId = 0
  CONTRIBUTOR_ASSIGNMENT_TOKEN = 7000
  VOTER_ASSIGNMENT_TOKEN = 3000

  async changePerspective(perspectiveTexts: string[]) {
    await admin.firestore().collection("polls").doc(this.daoId).update({
      perspective: perspectiveTexts,
    })
  }

  async setAssignmentToken(_contributorToken: number, _voterToken: number) {
    await admin.firestore().collection("polls").doc(this.daoId).set(
      {
        contributorAssignmentToken: _contributorToken,
        voterAssignmentToken: _voterToken,
      },
      { merge: true }
    )
  }

  async setVotingDuration(pollId: number, _votingDuration: number) {
    const _endTimeStamp = new Date(new Date().setDate(this.startTimeStamp.getDate() + _votingDuration))
    await admin
      .firestore()
      .collection("polls")
      .doc(this.daoId)
      .set(
        {
          startTime: admin.firestore.Timestamp.fromDate(this.startTimeStamp),
          endTime: admin.firestore.Timestamp.fromDate(_endTimeStamp),
        },
        { merge: true }
      )
  }

  async candidateToCurrentPoll(contributionText: string, evidences: string[], roles: string[]) {
    const _contributionItem: ContributionItem = {
      contributionText: contributionText,
      evidences: evidences,
      roles: roles,
      contributor: "myUserId",
      pollId: 0,
    }
    await admin
      .firestore()
      .collection("polls")
      .doc(this.daoId)
      .update({ contributions: admin.firestore.FieldValue.arrayUnion(_contributionItem) })
  }

  async vote(_pollId: string, _candidates: string[], _points: number[][], _comments: string[]): Promise<boolean> {
    const voters: string[] = await this.getVoters(_pollId)

    // Check if the voter is eligible to vote
    // not implemented

    // Check if the candidate is not empty
    if (_candidates.length == 0) {
      throw new Error("Candidates empty.")
    }

    // Check if the points and candidates are the same length
    if (_points.length != _candidates.length) {
      throw new Error("invalid points")
    }

    const perspectives = await this.getPerspectives(_pollId)

    // Firebaseでは2次元配列が保存できないため、number[][]型を { contributor: string; point: number[] }[]型に変換して保存する
    let _pointsObject: { contributor: string; point: number[] }[] = []

    for (let index = 0; index < _candidates.length; index++) {
      // Check if the candidate is in the current poll
      if (_candidates[index] != "myUserId") {
        throw new Error("Invalid candidate")
      }

      // Check if the points are valid
      for (let i = 0; i < perspectives.length; i++) {
        if (_points[index][i] < 0) {
          throw new Error("Invalid points")
        }
        // A voted point for oneself will always be 0.
        if (_candidates[index] === "myUserId") {
          _points[index][i] = 0
        }
      }

      _pointsObject.push({ contributor: _candidates[index], point: _points[index] })
    }

    // Check if the voter has already voted
    let voterIndex = this.VOTE_MAX_PARTICIPANT + 1
    for (let index = 0; index < voters.length; index++) {
      if (voters[index] == "myUserId") {
        voterIndex = index
      }
    }
    const _vote: Vote = {
      voter: "myUserId",
      candidates: _candidates,
      points: _pointsObject,
      comments: _comments,
      perspectiveId: this.activePerspective,
    }

    if (voterIndex == this.VOTE_MAX_PARTICIPANT + 1) {
      // save the vote to the list of votes
      voters.push("myUserId")
      await admin
        .firestore()
        .collection("polls")
        .doc(this.daoId)
        .set({ voters: voters, votes: admin.firestore.FieldValue.arrayUnion(_vote) }, { merge: true })
    } else {
      // update the vote to the list of votes
      let res: Vote[] = []
      let docRef = admin.firestore().collection("polls").doc(this.daoId)

      let doc = await docRef.get()

      if (doc.exists) {
        res = doc.data()?.votes
      }

      if (res) {
        res[voterIndex] = _vote
        await admin.firestore().collection("polls").doc(this.daoId).update({ voters: voters, votes: res })
      }
    }

    return true
  }

  async settleCurrentPollAndCreateNewPoll() {
    await this._settlePoll()
    await this._createPoll()
  }

  async _settlePoll() {
    const _votes: Vote[] = await this.getVotes(this.daoId)
    const _candidates: string[] = _votes[0].candidates
    const _perspectives: string[] = await this.getPerspectives(this.daoId)
    // Aggregated data for each candidate
    const candidatesAssessments: Assessment[][] = new Array(_candidates.length)
    // Aggregate score data (total score for each viewpoint)
    const summedPoints: number[] = []

    let candidatesAssessmentsArray: Assessment[] = []

    for (let c = 0; c < _candidates.length; c++) {
      candidatesAssessments[c] = new Array<Assessment>(_votes.length)
      for (let v = 0; v < _votes.length; v++) {
        //Skip vote whose perspective is not the latest
        // if (_votes[v].perspective != _perspectives) {
        //   continue
        // }
        //Skip vote for oneself
        if (_votes[v].voter == _candidates[c]) {
          continue
        }

        candidatesAssessments[c][v] = {
          voter: _votes[v].voter,
          contributor: _candidates[c],
          perspectiveId: this.activePerspective,
          points: _votes[v].points.find((p) => p.contributor === _candidates[c])?.point as number[],
          comment: _votes[v].comments[c],
          pollId: this.currentMaxPollId,
        }

        candidatesAssessmentsArray.push(candidatesAssessments[c][v])

        for (let p = 0; p < _perspectives.length; p++) {
          if (_votes[v].candidates[c] == _candidates[c]) {
            summedPoints[c] += _votes[v].points[c].point[p]
          }
        }
      }
    }

    // Calculate the total score
    let totalPoints = 0
    for (let index = 0; index < summedPoints.length; index++) {
      const points = summedPoints[index]
      totalPoints = totalPoints + points
    }

    if (totalPoints === 0) {
      return
    }

    // Decide how much to distribute to Contributors
    const assignmentToken: number[] = new Array<number>(_candidates.length)
    for (let index = 0; index < _candidates.length; index++) {
      const points = summedPoints[index]
      const token = (points * this.CONTRIBUTOR_ASSIGNMENT_TOKEN) / totalPoints
      assignmentToken[index] = token
    }

    this.transferTokenForContributor(_candidates, assignmentToken)

    // Decide how much to distribute to voters
    const _voters = await this.getVoters(this.daoId)
    const totalVoterCount = _voters.length
    if (totalVoterCount > 0) {
      const voterAssignmentToken = this.VOTER_ASSIGNMENT_TOKEN / totalVoterCount
      this.transferTokenForVoter(_voters, voterAssignmentToken)
    }

    //Save aggregation results in DAO History
    const daoHistory = new DAOHistory("")

    const pollDetail = await this.getPollDetail(this.daoId)
    console.log("pollDetail: ", pollDetail)
    const _contributions: ContributionItem[] = pollDetail.contributions
    let daoHistoryItemArray: DAOHistoryItemWithTimestamp[] = []
    if (_contributions) {
      if (_contributions.length > 0) {
        _contributions.forEach((contributionItem: ContributionItem, index) => {
          daoHistoryItemArray.push({
            contributionText: contributionItem.contributionText,
            reward: assignmentToken[index],
            rewardToken: "",
            roles: contributionItem.roles,
            timestamp: admin.firestore.Timestamp.now(),
            contributor: _candidates[index],
            pollId: this.currentMaxPollId,
            evidences: contributionItem.evidences,
          })
        })
        // daoHistory.addDaoHistory(this.daoId, this.projectId, ])
      }
    }

    daoHistory.addAssessment(this.daoId, this.projectId, candidatesAssessmentsArray)
  }

  /**
   * @notice start new poll
   */
  async _createPoll() {
    const pollFactory = new PollFactory()
    // endTimeを新しいPollのstartTimeにして、Pollをつくる

    pollFactory.createPoll(this.daoId, this.projectId)
  }

  async transferTokenForContributor(to: string[], amount: number[]): Promise<void> {
    if (to.length !== amount.length) {
      throw new Error("to != amount")
    }
    const tokenName = "pt"
    for (let index = 0; index < to.length; index++) {
      await admin
        .firestore()
        .collection("users")
        .doc(to[index])
        .update({ [tokenName]: amount[index] })
    }
  }

  async transferTokenForVoter(to: string[], amount: number): Promise<void> {
    const tokenName = "pt"
    for (let index = 0; index < to.length; index++) {
      await admin
        .firestore()
        .collection("users")
        .doc(to[index])
        .update({ [tokenName]: amount })
    }
  }

  async getPollDetail(daoId: string): Promise<DetailPollItem> {
    let res: DetailPollItem

    let docRef = admin.firestore().collection("polls").doc(daoId)

    let doc = await docRef.get()

    if (doc.exists) {
      res = {
        pollId: doc.data()?.pollId,
        contributions: doc.data()?.contributions,
        voters: doc.data()?.voters,
        startTime: doc.data()?.startTime.toDate(),
        endTime: doc.data()?.endTime.toDate(),
        perspectives: doc.data()?.perspectives,
      }
    } else {
      throw new Error("No such a document!")
    }
    return res
  }

  /**
   * @notice get the poll's votes
   */
  async getVotes(pollId: string): Promise<Vote[]> {
    let res: Vote[] = []

    let docRef = admin.firestore().collection("polls").doc(pollId)

    let doc = await docRef.get()

    if (doc.exists) {
      res = doc.data()?.votes
    } else {
      throw new Error("No such a document!")
    }
    return res
  }

  /**
   * @notice get the current poll's voters
   */
  async getVoters(pollId: string): Promise<string[]> {
    let voters: string[] = []

    let res: Vote[] = []
    let docRef = admin.firestore().collection("polls").doc(pollId)

    let doc = await docRef.get()

    if (doc.exists) {
      res = doc.data()?.votes
    }
    if (res) {
      voters = res.map((_vote: Vote) => _vote.voter)
    }

    return voters
  }

  async getPerspectives(daoId: string): Promise<string[]> {
    let res: string[] = []
    let docRef = admin.firestore().collection("polls").doc(daoId)

    let doc = await docRef.get()

    if (doc.exists) {
      res = doc.data()?.perspectives
    }

    return res
  }
}
