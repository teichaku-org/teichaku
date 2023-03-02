import { atom } from "jotai"

export const CreateDAOName = atom("")
export const CreateDAOFirstProject = atom("season1")
export const CreateDAOAvatar = atom("")
export const CreateDAODescription = atom("")
export const CreateDAORewardTokenAddress = atom("")
export const CreateDAORewardTokenContributorAmount = atom<number | undefined>(undefined)
export const CreateDAORewardTokenReviewerAmount = atom<number | undefined>(undefined)
export const CreateDAOSprintDuration = atom<number | undefined>(7)
export const CreateDAOPerspectives = atom<string[]>(["", "", ""])
