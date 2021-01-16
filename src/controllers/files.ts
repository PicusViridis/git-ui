import { Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

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
