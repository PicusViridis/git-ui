import { NextFunction, Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'
import { Page } from '../models/Pages'
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
  active: Page
}

export function repo(active: Page) {
  return async function (req: Request<P, unknown, unknown, Q>, res: Response, next: NextFunction): Promise<void> {
    const { repo, branch = 'master' } = req.params
    const { path = '.' } = req.query
    res.locals.title = repo
    res.locals.repo = repo
    res.locals.path = path
    res.locals.branch = branch
    res.locals.active = active

    const isEmpty = await RepositoryService.isEmpty(repo)
    if (isEmpty) {
      res.render('Repos/Empty', { url: `${req.protocol}://${req.get('host')}` })
      return
    }

    res.locals.branches = await RepositoryService.listBranches(repo)
    return next()
  }
}
