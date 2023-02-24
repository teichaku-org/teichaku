export type Vote = {
  voter: string
  candidates: string[]
  points: { contributor: string; point: number[] }[]
  comments: string[]
  perspectiveId: number
}
