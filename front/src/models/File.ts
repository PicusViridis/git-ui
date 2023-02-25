export interface IFileMeta {
  path: string
  name: string
  type: 'folder' | 'file'
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
