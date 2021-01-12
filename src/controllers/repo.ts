import { Request, Response } from 'express'
import { MAX_COMMIT_PER_PAGE, RepositoryService } from '../libs/repositories'

function getCommonInfo(req: Request) {
  const { repo } = req.params
  const branch = String(req.params.branch || 'master')
  const path = String(req.query.path || '.')
  return { repo, path, branch }
}

export async function getFiles(req: Request, res: Response): Promise<void> {
  const { repo, path, branch } = getCommonInfo(req)
  const files = await RepositoryService.getFiles(repo, path, branch)
  console.log(repo)
  res.render('repo/Files', { files })
}

export async function getFile(req: Request, res: Response): Promise<void> {
  const { repo, path, branch } = getCommonInfo(req)
  const content = await RepositoryService.getContent(repo, path, branch)
  const size = await RepositoryService.getSize(repo, path, branch)
  res.render('repo/File', { content, size })
}

export async function downloadFile(req: Request, res: Response): Promise<void> {
  const { repo, path, branch } = getCommonInfo(req)
  const filename = path.split('/').pop()
  const stream = await RepositoryService.getStream(repo, path, branch)
  res.set('Content-Disposition', `attachment; filename=${filename}`)
  res.send(stream)
}

export async function getCommits(req: Request, res: Response): Promise<void> {
  const { repo, branch } = getCommonInfo(req)
  const page = Number(req.query.page) || 1
  const commits = await RepositoryService.getCommits(repo, branch, page)
  const previous = page === 1 ? undefined : `${req.path}?page=${page - 1}`
  const next = commits.length < MAX_COMMIT_PER_PAGE ? undefined : `${req.path}?page=${page + 1}`
  res.render('repo/Commits', { commits, previous, next })
}

export async function getCommit(req: Request, res: Response): Promise<void> {
  const { repo, path } = getCommonInfo(req)
  const { hash } = req.params
  const diff = await RepositoryService.getDiffs(repo, path, hash)
  res.render('repo/Diff', { diff })
}
