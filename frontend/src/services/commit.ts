import { ICommit, ICommitDiff } from '../../../models/Commit'
import { request } from './wrapper'

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
  return request<ICommitList>(
    { url: `/api/repo/${repo}/${branch}/commits`, params: { path, page, limit } },
    { commits: [], total: 0 }
  )
}

export async function getCommit(repo: string, branch: string, hash: string): Promise<ICommitDiff | null> {
  return request<ICommitDiff | null>({ url: `/api/repo/${repo}/${branch}/commits/${hash}` }, null)
}
