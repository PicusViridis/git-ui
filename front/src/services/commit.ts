import { ICommit, ICommitDiff } from '../models/Commit'
import { Axios } from './Axios'

interface ICommitList {
  commits: ICommit[]
  total: number
}

export async function getCommits(
  repo: string,
  branch: string,
  page: number,
  limit: number,
  path?: string
): Promise<ICommitList> {
  const { data } = await Axios.get<ICommitList>(`/api/repo/${repo}/${branch}/commits`, {
    params: { path, page, limit },
  })
  return data
}

export async function getCommit(repo: string, branch: string, hash: string): Promise<ICommitDiff | null> {
  const { data } = await Axios.get<ICommitDiff | null>(`/api/repo/${repo}/${branch}/commits/${hash}`)
  return data
}
