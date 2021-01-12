import { NextFunction, Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

export function repo() {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { repo: name } = req.params
    const branch = String(req.params.branch || 'master')
    const path = String(req.query.path || '.')
    const branches = await RepositoryService.listBranches(name, branch)
    const breadcrumb = RepositoryService.getBreadcrumb(name, path)
    res.locals.repo = { name, path, branch, branches, breadcrumb }
    return next()
  }
}
