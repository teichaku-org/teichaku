import { PollDetail } from "@/domains/PollDetail"

export type usePollInterface = (
  props: { daoId: string; projectId: string },
  isWeb3?: boolean
) => {
  contractAddress: string
  isAdmin: boolean
  checkIsAdmin: () => Promise<void>
  pollDetail: PollDetail | undefined
  loadCurrentMaxPoll: () => void
  loadCurrentMaxPollId: () => Promise<number>
  contributorReward: number
  voterReward: number
  commissionFee: number
  vote: (pollId: number, candidates: string[], points: number[][], comments: string[]) => Promise<void>
  settleCurrentPollAndCreateNewPoll: () => Promise<void>
  candidateToPoll: (contributionText: string, evidences: string[], roles: string[]) => Promise<void>
  setTokenAddress: (_daoTokenAddress: string | null, _nftAddress: string | null) => Promise<void>
  setStartTime: (pollId: number, startTimeStamp: number) => Promise<void>
  setDuration: (pollId: number, durationDays: number) => Promise<void>
  setPerspectives: (perspectives: string[]) => Promise<void>
  setTokenDistribution: (contributorReward: number, voterReward: number) => Promise<void>
}
