export interface IFileMeta {
  path: string
  name: string
  type: 'file' | 'folder'
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
