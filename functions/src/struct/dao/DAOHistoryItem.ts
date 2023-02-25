export type DAOHistoryItem = {
  contributionText: string
  reward: number
  rewardToken: string
  roles: string[]
  timestamp: number
  contributor: string
  pollId: number
  evidences: string[]
}

export type DAOHistoryItemWithDate = {
  contributionText: string
  reward: number
  rewardToken: string
  roles: string[]
  timestamp: Date
  contributor: string
  pollId: number
  evidences: string[]
}
