import { IFile, IRepositoryMeta } from '../models/interfaces'

export function getQueryString(meta: IRepositoryMeta, file?: IFile): string {
  const query = new URLSearchParams()
  query.set('branch', meta.branch)
  query.set('repo', meta.repo)
  query.set('path', file?.path)
  return query.toString()
}
