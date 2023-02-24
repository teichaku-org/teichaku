import { ContributionItem } from "./ContributionItem"

export type DetailPollItem = {
  pollId: number
  contributions: ContributionItem[]
  voters: string[]
  startTime: number
  endTime: number
  perspectives: string[]
}
