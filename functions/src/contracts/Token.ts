import { ethers } from "ethers"
import * as admin from "firebase-admin"
import { FieldValue } from "firebase-admin/firestore"
import { GasFreeClient } from "../utils/GasFreeClient"
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
        .set({ amount: FieldValue.increment(amount) }, { merge: true })
    }

    return { get, set, add }
  }

  async transfer(to: string, amount: number) {
    this.balances(to).add(amount)
  }

  async createToken() {
    // 新規にWalletを作成
    const wallet = ethers.Wallet.createRandom()

    // アドレスと秘密鍵を取得
    const walletAddress = wallet.address
    const walletPrivateKey = wallet.privateKey

    // トークンを作成
    const message = walletAddress
    const signature = await wallet.signMessage(message)
    const client = new GasFreeClient()
    const response = await client.create(walletAddress, signature)

    // DBに保存
    admin.firestore().collection("GasFreeToken").doc(this.daoId).set({
      walletAddress,
      walletPrivateKey,
      tokenAddress: response.tokenAddress,
    })
  }
}
