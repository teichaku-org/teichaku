import * as admin from "firebase-admin";
import { PollFactory } from "./PollFactory";
import { DAOHistoryItem } from "../types/dao/DAOHistoryItem";

import { DaoInfo } from "../types/dao/DaoInfo";
import { Assessment } from "../types/assessment/Assessment";

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
    let projects: string[] = [];
    projects.push(projectId);

    // Add Dao
    await admin.firestore().collection("daos").doc(daoId).set({
      daoId: daoId,
      projects: projects,
      name: name,
      description: description,
      website: website,
      logo: logo,
      isWeb3: isWeb3,
    });

    // add Initial Poll
    this.addProject(daoId, projectId);
  }

  addProject(daoId: string, projectId: string) {
    const pollFactory = new PollFactory();
    let userId = "userId.....";
    let userAddress = "userAddress....";
    pollFactory.createPoll(daoId, projectId, userId, userAddress);
  }

  async addDaoHistory(
    daoId: string,
    projectId: string,
    daoHistoryItem: DAOHistoryItem
  ) {
    await admin
      .firestore()
      .collection("histories")
      .doc(daoId)
      .update({
        daoId: daoId,
        projectId: projectId,
        daoHistoryItem: admin.firestore.FieldValue.arrayUnion(daoHistoryItem),
      });
  }

  async addAssessment(
    daoId: string,
    projectId: string,
    assessments: Assessment[]
  ) {
    await admin
      .firestore()
      .collection("assessments")
      .doc(daoId)
      .update({ daoId: daoId, projectId: projectId, assessments: assessments });
  }

  async getDaoInfo(daoId: string): Promise<string | DaoInfo> {
    let res: DaoInfo | string = "";

    let docRef = admin.firestore().collection("daos").doc(daoId);

    let doc = await docRef.get();

    if (doc.exists) {
      res = {
        name: doc.data()?.name,
        description: doc.data()?.description,
        website: doc.data()?.website,
        logo: doc.data()?.logo,
        projects: doc.data()?.projects,
      };
    } else {
      res = "No such a document!";
    }
    return res;
  }

  async getDaoHistory(daoId: string): Promise<string | DAOHistoryItem[]> {
    let res: string | DAOHistoryItem[] = "";

    let docRef = admin.firestore().collection("histories").doc(daoId);

    let doc = await docRef.get();

    if (doc.exists) {
      res = doc.data()?.daoHistoryItem;
    } else {
      res = "No such a document!";
    }
    return res;
  }

  async getDaoAssessments(
    daoId: string,
    projectId: string
  ): Promise<string | Assessment[]> {
    let res: string | Assessment[] = "";

    let docRef = admin.firestore().collection("assessments").doc(daoId);
    // TODO 修正する projectごとにassessmentはある
    let doc = await docRef.get();

    if (doc.exists) {
      res = doc.data()?.assessments;
    } else {
      res = "No such a document!";
    }
    return res;
  }
}
