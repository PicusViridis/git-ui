import { IFile, IFileMeta } from '../../../models/File'
import { request } from './wrapper'

export async function getTree(repo: string, branch: string, path?: string): Promise<IFileMeta[] | IFile> {
  return request<IFileMeta[] | IFile>({ url: `/api/repo/${repo}/${branch}/tree`, params: { path } }, [])
}
