import { Request, Response } from 'express'
import { z } from 'zod'
import { repositoryService } from '../libs/repositories'

const schema = z.object({
  name: z.string(),
})

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

export async function postRepo(req: Request, res: Response): Promise<void> {
  const { name } = req.body
  const { success, failure } = req.logger.start('post_repo', { name })
  try {
    const { name } = schema.parse(req.body)
    await repositoryService.createRepository(`${name}.git`)
    res.sendStatus(201)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
