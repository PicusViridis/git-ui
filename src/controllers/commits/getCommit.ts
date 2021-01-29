import { Request, Response } from 'express'
import { RepositoryService } from '../../libs/repositories'

type Req = Request<{ hash: string }>
type Res = Response<string, { repo: string; path: string }>

export async function getCommit(req: Req, res: Res): Promise<void> {
  const { repo, path } = res.locals
  const { hash } = req.params
  const commit = await RepositoryService.getCommitDiff(repo, path, hash)
  res.render('Commits/Commit', { commit })
}
