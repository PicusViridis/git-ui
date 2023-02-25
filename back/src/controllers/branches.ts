import { Request, Response } from 'express'
import { z } from 'zod'
import { repositoryService } from '../libs/repositories'

const schema = z.object({
  repo: z.string(),
})

export async function getBranches(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_branches')
  try {
    const { repo } = schema.parse(req.params)
    const branches = await repositoryService.getBranches(repo)
    res.json(branches)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
