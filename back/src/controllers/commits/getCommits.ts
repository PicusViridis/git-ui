import { Request, Response } from 'express'
import { start } from '../../libs/logger'
import { repositoryService } from '../../libs/repositories'

export type Req = Request<
  { repo: string; branch: string },
  unknown,
  unknown,
  { path?: string; page: string; limit: string }
>

export async function getCommits(req: Req, res: Response): Promise<void> {
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
