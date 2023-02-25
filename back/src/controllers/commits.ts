import { Request, Response } from 'express'
import { z } from 'zod'
import { repositoryService } from '../libs/repositories'

const schema = {
  getCommits: {
    params: z.object({
      repo: z.string(),
      branch: z.string(),
    }),
    query: z.object({
      path: z.string().optional().default('.'),
      page: z.string().transform(Number).optional(),
      limit: z.string().transform(Number).optional(),
    }),
  },
  getCommit: {
    params: z.object({
      repo: z.string(),
      hash: z.string(),
    }),
    query: z.object({
      path: z.string().optional().default('.'),
    }),
  },
}

export async function getCommits(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_commits')
  try {
    const { repo, branch } = schema.getCommits.params.parse(req.params)
    const { path, page, limit } = schema.getCommits.query.parse(req.query)
    const commits = await repositoryService.getCommits(repo, path, branch, page, limit)
    const total = await repositoryService.countCommits(repo, path, branch)
    res.json({ commits, total })
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export async function getCommit(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_commit')
  try {
    const { repo, hash } = schema.getCommit.params.parse(req.params)
    const { path } = schema.getCommit.query.parse(req.query)
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
