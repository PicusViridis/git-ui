export interface IBranch {
  name: string
  lastCommit: {
    message: string
    date: string
  }
}
