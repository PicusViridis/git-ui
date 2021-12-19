import { Request, Response } from 'express'
import { FileType } from '../../../../models/File'
import { start } from '../../libs/logger'
import { repositoryService } from '../../libs/repositories'

export type Req = Request<{ repo: string; branch: string }, unknown, unknown, { path?: string }>

export async function getTree(req: Req, res: Response): Promise<void> {
  const { repo, branch } = req.params
  const { path = '.' } = req.query
  const { success, failure } = start('get_tree', { repo, branch, path })
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
