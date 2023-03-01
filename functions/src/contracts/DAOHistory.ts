import * as admin from "firebase-admin"
import { PollFactory } from "./PollFactory"
import { DAOHistoryItem } from "../struct/dao/DAOHistoryItem"

import { DaoInfo } from "../struct/dao/DaoInfo"
import { Assessment } from "../struct/assessment/Assessment"

export class DAOHistory {
  sender: string
  // daoId => projectId => [DAOHistoryItem, ...]
  histories(daoId: string, projectId: string) {
    const get = () => {
      return admin
        .firestore()
        .collection("DAOHistory")
        .doc(daoId)
        .collection("projects")
        .doc(projectId)
        .collection("histories")
        .get()
    }

    const push = (daoHistoryItem: DAOHistoryItem) => {
      return admin
        .firestore()
        .collection("DAOHistory")
        .doc(daoId)
        .collection("projects")
        .doc(projectId)
        .collection("histories")
        .add(daoHistoryItem)
    }

    return { get, push }
  }

  // daoId => projectId => [Assessment, ...]
  assessments(daoId: string, projectId: string) {
    const get = () => {
      return admin
        .firestore()
        .collection("assessments")
        .doc(daoId)
        .collection("projects")
        .doc(projectId)
        .collection("assessments")
        .get()
    }

    const push = (assessment: Assessment) => {
      return admin
        .firestore()
        .collection("assessments")
        .doc(daoId)
        .collection("projects")
        .doc(projectId)
        .collection("assessments")
        .add(assessment)
    }
    return { get, push }
  }

  // daoId => projectId => pollAddress
  pollAddress(daoId: string, projectId: string) {
    const get = () => {
      return admin
        .firestore()
        .collection("DAOHistory")
        .doc(daoId)
        .collection("projects")
        .doc(projectId)
        .collection("pollAddress")
        .get()
    }

    const set = (pollAddress: string) => {
      return admin
        .firestore()
        .collection("DAOHistory")
        .doc(daoId)
        .collection("projects")
        .doc(projectId)
        .collection("pollAddress")
        .add({ pollAddress })
    }
    return { get, set }
  }

  // daoId => DAOInfo
  daoInfo(daoId: string) {
    const get = () => {
      return admin.firestore().collection("DAOHistory").doc(daoId).collection("daoInfo").get()
    }

    const set = (daoInfo: DaoInfo) => {
      return admin.firestore().collection("DAOHistory").doc(daoId).collection("daoInfo").add(daoInfo)
    }
    return { get, set }
  }
  // Role to interact with DAO History
  ADD_HISTORY_ROLE = "ADD_HISTORY_ROLE"

  pollFactoryAddress = "NOT_USED"

  constructor(pollFactoryAddress: string, sender: string) {
    this.pollFactoryAddress = pollFactoryAddress
    this.sender = sender
  }

  /**
   * @notice Add DAO and create a poll contract
   */
  async addDao(daoId: string, projectId: string, name: string, description: string, website: string, logo: string) {
    // daoIdが存在するかcheck
    const daoInfo = await this.daoInfo(daoId).get()
    if (daoInfo.size > 0) {
      throw new Error("DAO already exists")
    }

    let projects: string[] = []
    projects.push(projectId)

    // add DAO
    await this.daoInfo(daoId).set({
      name,
      description,
      website,
      logo,
      projects,
    })

    // add Initial Poll
    const _pollAddress = await this.addProject(daoId, projectId)
    return _pollAddress
  }

  /**
   * @notice Add Project and create a poll contract
   */
  async addProject(daoId: string, projectId: string) {
    const _pollAddress = await new PollFactory(this.sender).createPoll(daoId, projectId)
    this.pollAddress(daoId, projectId).set(_pollAddress)
    return _pollAddress
  }

  async addDaoHistory(daoId: string, projectId: string, daoHistoryItem: DAOHistoryItem) {
    this.histories(daoId, projectId).push(daoHistoryItem)
  }

  async addAssessment(daoId: string, projectId: string, assessments: Assessment[]) {
    for (let index = 0; index < assessments.length; index++) {
      const element = assessments[index]
      await this.assessments(daoId, projectId).push(element)
    }
  }

  async getDaoInfo(daoId: string): Promise<DaoInfo> {
    return this.daoInfo(daoId)
      .get()
      .then((querySnapshot) => {
        let res: DaoInfo = {
          name: "",
          description: "",
          website: "",
          logo: "",
          projects: [],
        }
        querySnapshot.forEach((doc) => {
          res = doc.data() as DaoInfo
        })
        return res
      })
  }

  async getDaoHistory(daoId: string, projectId: string): Promise<DAOHistoryItem[]> {
    return this.histories(daoId, projectId)
      .get()
      .then((querySnapshot) => {
        let res: DAOHistoryItem[] = []
        querySnapshot.forEach((doc) => {
          res.push(doc.data() as DAOHistoryItem)
        })
        return res
      })
  }

  async getDaoAssessments(daoId: string, projectId: string): Promise<Assessment[]> {
    return this.assessments(daoId, projectId)
      .get()
      .then((querySnapshot) => {
        let res: Assessment[] = []
        querySnapshot.forEach((doc) => {
          res.push(doc.data() as Assessment)
        })
        return res
      })
  }
}
