import { Request, Response } from 'express'
import { repositoryService } from '../libs/repositories'

export async function getRepos(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_repos')
  try {
    const repositories = await repositoryService.getRepositories()
    res.json(repositories)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export type Req = Request<any, unknown, { name: string }>

export async function postRepo(req: Req, res: Response): Promise<void> {
  const { name } = req.body
  const { success, failure } = req.logger.start('post_repo', { name })
  try {
    await repositoryService.createRepository(`${name}.git`)
    res.sendStatus(201)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
