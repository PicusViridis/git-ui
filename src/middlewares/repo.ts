import { NextFunction, Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

type Q = { repo: string; branch?: string; path?: string }

export function repo() {
  return async function (req: Request<unknown, unknown, unknown, Q>, res: Response, next: NextFunction): Promise<void> {
    const { repo, branch = 'master', path = '.' } = req.query
    if (!repo) {
      res.redirect('/')
      return
    }
    const query = new URLSearchParams()
    query.set('branch', branch)
    query.set('repo', repo)
    query.set('path', path)
    const branches = await RepositoryService.listBranches(repo)
    res.locals.meta = { repo, path, branch, branches }
    res.locals.query = query.toString()
    res.locals.path = req.path
    return next()
  }
}
