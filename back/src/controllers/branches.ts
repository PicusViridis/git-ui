import { Request, Response } from 'express'
import { repositoryService } from '../libs/repositories'

export type Req = Request<{ repo: string }>

export async function getBranches(req: Req, res: Response): Promise<void> {
  const { repo } = req.params
  const { success, failure } = req.logger.start('get_branches', { repo })
  try {
    const branches = await repositoryService.getBranches(repo)
    res.json(branches)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
