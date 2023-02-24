import { ContributionItem } from "./ContributionItem";

export type DetailPollItem = {
  pollId: string;
  contributions: ContributionItem[];
  voters: string[];
  startTime: Date;
  endTime: Date;
  perspectives: string[];
};
