export type DaoHistory = {
  contributionText: string
  reward: number
  rewardToken: string
  roles: string[]
  timestamp: Date
  contributor: string
  pollId: number
  evidences: string[]
}

export type DaoHistoryWithNumber = {
  contributionText: string
  reward: number
  rewardToken: string
  roles: string[]
  timestamp: number
  contributor: string
  pollId: number
  evidences: string[]
}
