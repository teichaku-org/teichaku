import * as admin from "firebase-admin";
import { ContributionItem } from "../types/poll/ContributionItem";
import { DetailPollItem } from "../types/poll/DetailPollItem";

export class Poll {
  private daoId: string;
  // private projectId: string;
  private startTimeStamp: Date;
  // private endTimeStamp: Date;
  // private perspectives: Array<string>;

  // Constructor
  constructor(_daoId: string, _projectId: string) {
    this.daoId = _daoId;
    // this.projectId = _projectId;
    this.startTimeStamp = new Date();
    // this.endTimeStamp = new Date(new Date().getTime() + 24 * 60 * 60 * 60 * 7 * 1000);
    // this.perspectives = ["Planning", "Execution", "Improvement"];
  }
  CONTRIBUTOR_ASSIGNMENT_TOKEN: number = 0 * 10 ** 18;
  VOTER_ASSIGNMENT_TOKEN: number = 0 * 10 ** 18;

  async setAssignmentToken(_contributorToken: number, _voterToken: number) {
    await admin.firestore().collection("polls").doc(this.daoId).update({
      contributorAssignmentToken: _contributorToken,
      voterAssignmentToken: _voterToken,
    });
  }

  async setVotingDuration(_startTimeStamp: Date, _votingDuration: Date) {
    await admin
      .firestore()
      .collection("polls")
      .doc(this.daoId)
      .update({
        startTime: this.startTimeStamp,
        endTime: new Date(this.startTimeStamp.getTime() + _votingDuration.getTime()),
      });
  }

  async candidateToCurrentPoll(contributionItem: ContributionItem) {
    await admin
      .firestore()
      .collection("polls")
      .doc(this.daoId)
      .update({ contributions: admin.firestore.FieldValue.arrayUnion(contributionItem) });
  }

  async getPollDetail(pollId: string): Promise<DetailPollItem | string> {
    let res: DetailPollItem | string = "";

    let docRef = admin.firestore().collection("polls").doc(pollId);

    let doc = await docRef.get();

    if (doc.exists) {
      res = {
        pollId: doc.data()?.pollId,
        contributions: doc.data()?.contributions,
        voters: doc.data()?.voters,
        startTime: doc.data()?.startTime,
        endTime: doc.data()?.endTime,
        perspectives: doc.data()?.perspectives,
      };
    } else {
      res = "No such a document!";
    }
    return res;
  }
}
