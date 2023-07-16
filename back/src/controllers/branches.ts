import { Request, Response } from 'express'
import { z } from 'zod'
import { repositoryService } from '../libs/repositories'

const schema = {
  get: z.object({
    repo: z.string(),
  }),
  delete: z.object({
    repo: z.string(),
    name: z.string(),
  }),
}

export async function getBranches(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_branches')
  try {
    const { repo } = schema.get.parse(req.params)
    const branches = await repositoryService.getBranches(repo)
    res.json(branches)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export async function deleteBranch(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_branches')
  try {
    const { repo, name } = schema.delete.parse(req.params)
    await repositoryService.deleteBranch(repo, name)
    res.sendStatus(204)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
