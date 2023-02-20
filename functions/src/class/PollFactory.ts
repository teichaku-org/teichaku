import * as admin from "firebase-admin";

export class PollFactory {
  COMMISSION_RATE: number = 5;
  COMMISSION_ADDRESS: string = "";

  async createPoll(
    daoId: string,
    projectId: string,
    userId: string,
    userAddress: string
  ) {
    await admin.firestore().collection("polls").doc(daoId).set({
      daoId: daoId,
      projectId: projectId,
      userId: userId,
      userAddress: userAddress,
      commissionRate: this.COMMISSION_RATE,
      commissionAddress: this.COMMISSION_RATE,
    });
  }
}
