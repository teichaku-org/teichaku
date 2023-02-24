import * as admin from "firebase-admin"

export class PollFactory {
  private daoId: string

  constructor(daoId: string) {
    this.daoId = daoId
  }

  COMMISSION_RATE: number = 5
  COMMISSION_ADDRESS: string = ""

  async createPoll(daoId: string, projectId: string) {
    await admin.firestore().collection("daos").doc(daoId).set(
      {
        pollId: daoId,
        projectId: projectId,
        commissionRate: this.COMMISSION_RATE,
        commissionAddress: this.COMMISSION_RATE,
      },
      { merge: true }
    )
  }

  async setCommissionRate(rate: number) {
    await admin.firestore().collection("daos").doc(this.daoId).update({
      commissionRate: rate,
    })
  }

  async setCommissionAddress(addr: string) {
    await admin.firestore().collection("daos").doc(this.daoId).update({
      commissionAddress: addr,
    })
  }
}
