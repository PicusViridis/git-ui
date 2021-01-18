import { NextFunction, Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

type P = { repo: string; branch?: string }
type Q = { path?: string }

export function repo(active: string) {
  return async function (req: Request<P, unknown, unknown, Q>, res: Response, next: NextFunction): Promise<void> {
    const { repo, branch = 'master' } = req.params
    const { path = '.' } = req.query
    const branches = await RepositoryService.listBranches(repo)
    res.locals = { repo, path, branch, branches, active }
    return next()
  }
}
