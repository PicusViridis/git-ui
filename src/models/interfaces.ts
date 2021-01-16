export interface ICommit {
  fullHash: string
  hash: string
  author: string
  date: string
  timestamp: number
  message: string
}

export interface IRepositoryMeta {
  repo: string
  path: string
  branch: string
  branches: string[]
  breadcrumb: IBreadcrumb[]
}

export interface IRepository {
  name: string
  lastCommit: ICommit
}

export interface IBreadcrumb {
  name: string
  path: string
  isActive: boolean
}
