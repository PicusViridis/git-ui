import { Request, Response } from 'express'
import { MAX_COMMIT_PER_PAGE, RepositoryService } from '../libs/repositories'

export async function getFiles(req: Request, res: Response): Promise<void> {
  const { repo, path, branch } = res.locals.meta
  const files = await RepositoryService.getFiles(repo, path, branch)
  res.render('Files/Files', { files })
}

export async function getFile(req: Request, res: Response): Promise<void> {
  const { repo, path, branch } = res.locals.meta
  const content = await RepositoryService.getContent(repo, path, branch)
  const size = await RepositoryService.getSize(repo, path, branch)
  res.render('Files/File', { content, size })
}

export async function downloadFile(req: Request, res: Response): Promise<void> {
  const { repo, path, branch } = res.locals.meta
  const filename = path.split('/').pop()
  const stream = await RepositoryService.getStream(repo, path, branch)
  res.set('Content-Disposition', `attachment; filename=${filename}`)
  res.send(stream)
}

export async function getCommits(req: Request, res: Response): Promise<void> {
  const { repo, branch } = res.locals.meta
  const page = Number(req.query.page) || 1
  const [commits, count] = await RepositoryService.getCommits(repo, branch, page)
  const maxPage = Math.ceil(count / MAX_COMMIT_PER_PAGE)
  const first = page === 1 ? undefined : `${req.path}?page=1`
  const previous = page === 1 ? undefined : `${req.path}?page=${page - 1}`
  const next = page * MAX_COMMIT_PER_PAGE >= count ? undefined : `${req.path}?page=${page + 1}`
  const last = page === maxPage ? undefined : `${req.path}?page=${maxPage}`
  const pagination = { page, maxPage, first, previous, next, last }
  res.render('Commits/Commits', { commits, pagination })
}

export async function getCommit(req: Request, res: Response): Promise<void> {
  const { repo, path } = res.locals.meta
  const { hash } = req.params
  const diff = await RepositoryService.getDiffs(repo, path, hash)
  res.render('Commits/Commit', { diff })
}
