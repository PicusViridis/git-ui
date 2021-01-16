import { Request, Response } from 'express'
import { MAX_COMMIT_PER_PAGE, RepositoryService } from '../libs/repositories'
import { ICommitsProps } from '../views/Commits/Commits'

function getPagination(page: number, count: number, path: string): ICommitsProps['pagination'] {
  const maxPage = Math.ceil(count / MAX_COMMIT_PER_PAGE)
  const first = page === 1 ? undefined : `${path}?page=1`
  const previous = page === 1 ? undefined : `${path}?page=${page - 1}`
  const next = page * MAX_COMMIT_PER_PAGE >= count ? undefined : `${path}?page=${page + 1}`
  const last = page === maxPage ? undefined : `${path}?page=${maxPage}`
  return { page, maxPage, first, previous, next, last }
}

export async function getCommits(req: Request, res: Response): Promise<void> {
  const { repo, branch } = res.locals.meta
  const page = Number(req.query.page) || 1
  const [commits, count] = await RepositoryService.getCommits(repo, branch, page)
  const pagination = getPagination(page, count, req.path)
  res.render('Commits/Commits', { commits, pagination })
}

export async function getCommit(req: Request, res: Response): Promise<void> {
  const { repo, path } = res.locals.meta
  const { hash } = req.params
  const commit = await RepositoryService.getCommitDiff(repo, path, hash)
  res.render('Commits/Commit', { commit })
}
