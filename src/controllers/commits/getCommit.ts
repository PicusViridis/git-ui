import { Request, Response } from 'express'
import { RepositoryService } from '../../libs/repositories'

export type Req = Request<{ hash: string }>
export type Res = Response<string, { repo: string; path: string }>

export async function getCommit(req: Req, res: Res): Promise<void> {
  const { repo, path } = res.locals
  const { hash } = req.params
  const commit = await RepositoryService.getCommitDiff(repo, path, hash)
  res.render('Commits/Commit', { commit })
}
