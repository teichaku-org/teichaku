import * as admin from "firebase-admin"
import { PollFactory } from "./PollFactory"
import { DAOHistoryItem, DAOHistoryItemWithTimestamp } from "../types/dao/DAOHistoryItem"

import { DaoInfo } from "../types/dao/DaoInfo"
import { Assessment } from "../types/assessment/Assessment"

export class DAOHistory {
  async addDao(
    daoId: string,
    projectId: string,
    name: string,
    description: string,
    website: string,
    logo: string,
    isWeb3: boolean
  ) {
    // daoIdが存在するかcheck
    let projects: string[] = []
    projects.push(projectId)

    // Add Dao
    await admin.firestore().collection("daos").doc(daoId).set({
      daoId: daoId,
      projects: projects,
      name: name,
      description: description,
      website: website,
      logo: logo,
      isWeb3: isWeb3,
    })

    // add Initial Poll
    await this.addProject(daoId, projectId)
  }

  async addProject(daoId: string, projectId: string) {
    const pollFactory = new PollFactory(daoId)
    await pollFactory.createPoll(daoId, projectId)
  }

  async addDaoHistory(daoId: string, projectId: string, daoHistoryItemArray: DAOHistoryItemWithTimestamp[]) {
    await admin
      .firestore()
      .collection("histories")
      .doc(daoId)
      .set(
        {
          daoHistoryItem: admin.firestore.FieldValue.arrayUnion(...daoHistoryItemArray),
        },
        { merge: true }
      )
  }

  async addAssessment(daoId: string, projectId: string, assessments: Assessment[]) {
    await admin
      .firestore()
      .collection("assessments")
      .doc(daoId)
      .set({ assessments: admin.firestore.FieldValue.arrayUnion(...assessments) }, { merge: true })
  }

  async getDaoInfo(daoId: string): Promise<DaoInfo> {
    let res: DaoInfo

    let docRef = admin.firestore().collection("daos").doc(daoId)

    let doc = await docRef.get()

    if (doc.exists) {
      res = {
        name: doc.data()?.name,
        description: doc.data()?.description,
        website: doc.data()?.website,
        logo: doc.data()?.logo,
        projects: doc.data()?.projects,
      }
    } else {
      throw new Error("No such a document!")
    }
    return res
  }

  async getDaoHistory(daoId: string, projectId: string): Promise<DAOHistoryItem[]> {
    let res: DAOHistoryItem[] = []

    let docRef = admin.firestore().collection("histories").doc(daoId)

    let doc = await docRef.get()

    if (doc.exists) {
      // timestampをTimeStamp型からDate型に変換
      res = doc.data()?.daoHistoryItem.map((daoHistoryItem: DAOHistoryItemWithTimestamp) => {
        const date = daoHistoryItem.timestamp.toDate()
        return {
          ...daoHistoryItem,
          timestamp: date,
        }
      })
    } else {
      throw new Error("No such a document!")
    }
    return res
  }

  async getDaoAssessments(daoId: string, projectId: string): Promise<Assessment[]> {
    let res: Assessment[] = []

    let docRef = admin.firestore().collection("assessments").doc(daoId)
    // TODO 修正する projectごとにassessmentはある
    let doc = await docRef.get()

    if (doc.exists) {
      res = doc.data()?.assessments
    } else {
      throw new Error("No such a document!")
    }
    return res
  }
}
