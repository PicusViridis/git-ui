export interface ICommit {
  hash: string;
  message: string;
  date: string;
  author: string;
  parent: string;
}

export interface ICommitDiff {
  message: string;
  diff: string;
}
