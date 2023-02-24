import * as admin from "firebase-admin"

export class Token {
  daoId: string
  constructor(daoId: string) {
    this.daoId = daoId
  }

  balances(userId: string) {
    const get = () => {
      return admin.firestore().collection("Token").doc(this.daoId).collection("balances").doc(userId).get()
    }

    const set = (amount: number) => {
      return admin.firestore().collection("Token").doc(this.daoId).collection("balances").doc(userId).set({ amount })
    }

    const add = (amount: number) => {
      return admin
        .firestore()
        .collection("Token")
        .doc(this.daoId)
        .collection("balances")
        .doc(userId)
        .set({ amount: admin.firestore.FieldValue.increment(amount) })
    }

    return { get, set, add }
  }

  async transfer(to: string, amount: number) {
    this.balances(to).add(amount)
  }
}
