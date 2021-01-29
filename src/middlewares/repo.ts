import { NextFunction, Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'
import { User } from '../models/User'

type P = { repo: string; branch?: string }
type Q = { path?: string }

export type Locals = {
  user: User
  title: string
  repo: string
  path: string
  branch: string
  branches: string[]
  active: string
}

export function repo(active: string) {
  return async function (req: Request<P, unknown, unknown, Q>, res: Response, next: NextFunction): Promise<void> {
    const { repo, branch = 'master' } = req.params
    const { path = '.' } = req.query
    const branches = await RepositoryService.listBranches(repo)
    res.locals = { ...res.locals, title: repo, repo, path, branch, branches, active }
    return next()
  }
}
