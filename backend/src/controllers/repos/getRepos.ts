import { Request, Response } from 'express'
import { start } from '../../libs/logger'
import { repositoryService } from '../../libs/repositories'

export async function getRepos(req: Request, res: Response): Promise<void> {
  const { success, failure } = start('get_repos')
  try {
    const repositories = await repositoryService.getRepositories()
    res.json(repositories)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
