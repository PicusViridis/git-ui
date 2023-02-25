import { Request, Response } from 'express'
import { z } from 'zod'
import { repositoryService } from '../libs/repositories'
import { FileType } from '../models/File'

const schema = {
  params: z.object({
    repo: z.string(),
    branch: z.string(),
  }),
  query: z.object({
    path: z.string().optional().default('.'),
  }),
}

export async function getTree(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('get_tree')
  try {
    const { repo, branch } = schema.params.parse(req.params)
    const { path } = schema.query.parse(req.query)
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

export async function download(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.start('download')
  try {
    const { repo, branch } = schema.params.parse(req.params)
    const { path } = schema.query.parse(req.query)
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
