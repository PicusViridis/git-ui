import { IFile, IFileMeta } from '../models/File'
import { Axios } from './Axios'

export async function getTree(repo: string, branch: string, path?: string): Promise<IFileMeta[] | IFile> {
  const { data } = await Axios.get<IFileMeta[] | IFile>(`/api/repo/${repo}/${branch}/tree`, { params: { path } })
  return data
}
