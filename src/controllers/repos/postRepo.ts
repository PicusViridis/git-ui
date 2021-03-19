import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RepositoryService } from '../../libs/repositories'

export type Req = Request<ParamsDictionary, unknown, { name: string }>

export async function postRepo(req: Req, res: Response): Promise<void> {
  const { name } = req.body
  await RepositoryService.createRepository(`${name}.git`)
  res.redirect('/')
}
