import { html, parse } from 'diff2html'
import { Request, Response } from 'express'
import { RepositoryService } from '../../libs/repositories'

export type Req = Request<{ hash: string }>
export type Res = Response<string, { repo: string; path: string }>

export async function getCommit(req: Req, res: Res): Promise<void> {
  const { repo, path } = res.locals
  const { hash } = req.params
  const { message, diff } = await RepositoryService.getCommitDiff(repo, path, hash)
  res.render('Commits/Commit', {
    message,
    diff: html(parse(diff), { outputFormat: 'side-by-side', drawFileList: false }),
  })
}
