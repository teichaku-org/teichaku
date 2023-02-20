import { Timestamp } from "firebase-admin/firestore";

export type DAOHistoryItem = {
  contributionText: string;
  reward: number;
  rewardToken: string;
  roles: string[];
  timestamp: Timestamp;
  contributor: string;
  pollId: number;
  evidences: string[];
};
