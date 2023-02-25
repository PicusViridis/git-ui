import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { start } from '../libs/logger'
import { repositoryService } from '../libs/repositories'

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

export type Req = Request<ParamsDictionary, unknown, { name: string }>

export async function postRepo(req: Req, res: Response): Promise<void> {
  const { name } = req.body
  const { success, failure } = start('post_repo', { name })
  try {
    await repositoryService.createRepository(`${name}.git`)
    res.sendStatus(201)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
