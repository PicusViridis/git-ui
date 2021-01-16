import { NextFunction, Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

type Q = { repo: string; branch?: string; path?: string }

export function repo() {
  return async function (req: Request<unknown, unknown, unknown, Q>, res: Response, next: NextFunction): Promise<void> {
    const { repo, branch = 'master', path = '.' } = req.query
    const branches = await RepositoryService.listBranches(repo, branch)
    const breadcrumb = RepositoryService.getBreadcrumb(repo, path)
    res.locals.meta = { repo, path, branch, branches, breadcrumb }
    return next()
  }
}
