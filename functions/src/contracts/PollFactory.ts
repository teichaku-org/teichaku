import * as admin from "firebase-admin"
import { Poll } from "./Poll"

export class PollFactory {
  //TODO: 本当はDBで管理した方が良いが、今回は簡単のためにコードで管理
  COMMISSION_RATE: number = 5
  COMMISSION_ADDRESS: string = ""

  pollContracts(pollAddress: string) {
    const get = () => {
      return admin.firestore().collection("polls").doc(pollAddress).get()
    }

    const set = (poll: Poll) => {
      //TODO: 何を保存するかは要検討
      return admin.firestore().collection("polls").doc(pollAddress).set({ poll: "未定" })
    }

    return { get, set }
  }

  async createPoll(daoId: string, projectId: string) {
    const poll = new Poll(daoId, projectId)
    const pollAddress = daoId //TODO:乱数が良いが、一旦はDAOのIDを使う
    //コントラクトを新しく作っているので、DB側に保存する
    await this.pollContracts(pollAddress).set(poll)
    return pollAddress
  }
}
