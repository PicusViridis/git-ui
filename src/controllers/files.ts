import { Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

export async function getFile(req: Request, res: Response): Promise<void> {
  const { repo, branch, path } = res.locals
  const { type } = req.query
  if (type === 'file') {
    const content = await RepositoryService.getContent(repo, path, branch)
    const size = await RepositoryService.getSize(repo, path, branch)
    res.render('Files/File', { content, size })
  } else {
    const files = await RepositoryService.getFiles(repo, path, branch)
    res.render('Files/Files', { files })
  }
}

export async function downloadFile(req: Request, res: Response): Promise<void> {
  const { repo, branch, path } = res.locals
  const filename = path.split('/').pop()
  const stream = await RepositoryService.getStream(repo, path, branch)
  res.set('Content-Disposition', `attachment; filename=${filename}`)
  res.send(stream)
}
