import { ICommit } from './interfaces'

export interface IFile {
  type: 'file' | 'folder'
  icon: string
  name: string
  path: string
  size: string
  content: string
  lastCommit: ICommit
}
