import { Request, Response } from 'express'
import { start } from '../../libs/logger'
import { repositoryService } from '../../libs/repositories'

export type Req = Request<{ repo: string; branch: string; hash: string }, unknown, unknown, { path?: string }>

export async function getCommit(req: Req, res: Response): Promise<void> {
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
