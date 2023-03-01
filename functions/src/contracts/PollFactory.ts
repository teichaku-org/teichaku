import * as admin from "firebase-admin"
import { Poll } from "./Poll"

export class PollFactory {
  //TODO: 本当はDBで管理した方が良いが、今回は簡単のためにコードで管理
  COMMISSION_RATE: number = 5
  COMMISSION_ADDRESS: string = ""
  sender: string

  constructor(sender: string) {
    this.sender = sender
  }

  pollContracts(pollAddress: string) {
    const get = () => {
      return admin.firestore().collection("polls").doc(pollAddress).get()
    }

    const set = (poll: Poll) => {}

    return { get, set }
  }

  async createPoll(daoId: string, projectId: string) {
    const poll = new Poll(daoId, projectId, this.sender)
    const pollAddress = daoId //TODO:乱数が良いが、一旦はDAOのIDを使う
    await poll.init()
    return pollAddress
  }
}
