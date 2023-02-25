import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { start } from '../../libs/logger'
import { repositoryService } from '../../libs/repositories'

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
