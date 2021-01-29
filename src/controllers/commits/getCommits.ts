import { Request, Response } from 'express'
import { MAX_COMMIT_PER_PAGE, RepositoryService } from '../../libs/repositories'
import { Locals } from '../../middlewares/repo'
import { ICommitsProps } from '../../views/Commits/Commits'

export function getPagination(page: number, count: number, path: string): ICommitsProps['pagination'] {
  const maxPage = Math.ceil(count / MAX_COMMIT_PER_PAGE)
  const first = page === 1 ? undefined : `${path}?page=1`
  const previous = page === 1 ? undefined : `${path}?page=${page - 1}`
  const next = page * MAX_COMMIT_PER_PAGE >= count ? undefined : `${path}?page=${page + 1}`
  const last = page === maxPage ? undefined : `${path}?page=${maxPage}`
  return { page, maxPage, first, previous, next, last }
}

export type Req = Request<never, unknown, unknown, { page?: string }>
export type Res = Response<string, Locals>

export async function getCommits(req: Req, res: Res): Promise<void> {
  const { repo, branch, path } = res.locals
  const page = Number(req.query.page) || 1
  const [commits, count] = await RepositoryService.getCommits(repo, path, branch, page)
  const pagination = getPagination(page, count, req.path)
  res.render('Commits/Commits', { commits, pagination })
}
