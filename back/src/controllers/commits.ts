import { Request, Response } from 'express'
import { start } from '../libs/logger'
import { repositoryService } from '../libs/repositories'

export type Req1 = Request<
  { repo: string; branch: string },
  unknown,
  unknown,
  { path?: string; page: string; limit: string }
>

export async function getCommits(req: Req1, res: Response): Promise<void> {
  const { repo, branch } = req.params
  const { path = '.', page, limit } = req.query
  const { success, failure } = start('get_commits', { repo, branch, path, page, limit })
  try {
    const commits = await repositoryService.getCommits(repo, path, branch, Number(page), Number(limit))
    const total = await repositoryService.countCommits(repo, path, branch)
    res.json({ commits, total })
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export type Req2 = Request<{ repo: string; branch: string; hash: string }, unknown, unknown, { path?: string }>

export async function getCommit(req: Req2, res: Response): Promise<void> {
  const { repo, hash } = req.params
  const { path = '.' } = req.query
  const { success, failure } = start('get_commit', { repo, path, hash })
  try {
    const [commit] = await repositoryService.getCommits(repo, path, hash, 1, 1)
    if (!commit) {
      res.sendStatus(404)
    } else {
      const diff = await repositoryService.getCommitDiff(repo, path, hash, commit.parent)
      res.json({ message: commit.message, diff })
    }
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
