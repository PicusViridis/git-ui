import { Request, Response } from 'express'
import { repositoryService } from '../libs/repositories'
import { FileType } from '../models/File'

export type Req1 = Request<{ repo: string; branch: string }, unknown, unknown, { path?: string }>

export async function getTree(req: Req1, res: Response): Promise<void> {
  const { repo, branch } = req.params
  const { path = '.' } = req.query
  const { success, failure } = req.logger.start('get_tree', { repo, branch, path })
  try {
    const type = await repositoryService.getFileType(repo, path, branch)
    if (type === FileType.FOLDER) {
      const files = await repositoryService.getFiles(repo, path, branch)
      res.json(files)
    } else {
      const content = await repositoryService.getContent(repo, path, branch)
      const size = await repositoryService.getSize(repo, path, branch)
      res.json({ content, size })
    }
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export type Req2 = Request<{ repo: string; branch: string }, unknown, unknown, { path?: string }>

export async function download(req: Req2, res: Response): Promise<void> {
  const { repo, branch } = req.params
  const { path = '.' } = req.query
  const { success, failure } = req.logger.start('download', { repo, branch, path })
  try {
    const content = await repositoryService.getContent(repo, path, branch)
    const filename = path.split('/').pop()
    res.set('Content-Disposition', `attachment; filename=${filename}`)
    res.send(content)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
