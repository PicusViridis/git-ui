export interface ICommit {
  fullHash: string
  hash: string
  author: string
  date: string
  timestamp: number
  message: string
}

export interface IFileMeta {
  type: 'file' | 'folder'
  path: string
}

export interface IRepositoryMeta {
  name: string
  path: string
  branch: string
  branches: string[]
  breadcrumb: IBreadcrumb[]
}

export interface IRepository {
  name: string
  lastCommit: ICommit
}

export interface IFile extends IFileMeta {
  icon: string
  name: string
  lastCommit: ICommit
}

export interface IBreadcrumb {
  name: string
  path: string
  isActive: boolean
}
