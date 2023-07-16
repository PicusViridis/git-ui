import { IFile, IFileMeta } from '../models/File'
import { Axios } from './Axios'

export async function getTree(repo: string, branch: string, path?: string): Promise<IFileMeta[] | IFile | null> {
  const { data } = await Axios.get<IFileMeta[] | IFile | null>(`/api/repo/${repo}/${branch}/tree`, { params: { path } })
  return data
}
