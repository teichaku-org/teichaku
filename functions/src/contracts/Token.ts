import * as admin from "firebase-admin"
import { FieldValue } from "firebase-admin/firestore"
export class Token {
  daoId: string
  constructor(daoId: string) {
    this.daoId = daoId
  }

  balances(userId: string) {
    const get = () => {
      return admin
        .firestore()
        .collection("Token")
        .doc(this.daoId)
        .collection("balances")
        .doc(userId)
        .get()
        .then((r) => {
          return r.data()?.amount
        })
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
        .update({ amount: FieldValue.increment(amount) })
    }

    return { get, set, add }
  }

  async transfer(to: string, amount: number) {
    this.balances(to).add(amount)
  }
}
