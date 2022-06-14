export interface ICommit {
  hash: string;
  message: string;
  date: string;
  author: string;
  parent: string;
}

export interface ICommitDiff {
  message: string;
  diff: {
    name: string;
    status: "changed" | "added" | "removed" | "renamed";
    lines: {
      left: { n?: number; v?: string; t?: "empty" | "add" | "remove" };
      right: { n?: number; v?: string; t?: "empty" | "add" | "remove" };
    }[];
  };
}
