import { Contribution } from "./Contribution"

export type PollDetail = {
    pollId: number
    contributions: Contribution[]
    voters: string[]
    alreadyVoted: boolean
    alreadyContributed: boolean
    startTimeStamp: Date
    endTimeStamp: Date
    perspectives: string[]
}