export enum FileType {
  FOLDER = 0,
  FILE = 1,
}

export interface IFileMeta {
  path: string
  name: string
  type: FileType
  icon: string
  lastCommit: {
    message: string
    date: string
  }
}

export interface IFile {
  content: string
  size: number
}
