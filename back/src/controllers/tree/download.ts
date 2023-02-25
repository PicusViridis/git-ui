import { Request, Response } from 'express'
import { start } from '../../libs/logger'
import { repositoryService } from '../../libs/repositories'

export type Req = Request<{ repo: string; branch: string }, unknown, unknown, { path?: string }>

export async function download(req: Req, res: Response): Promise<void> {
  const { repo, branch } = req.params
  const { path = '.' } = req.query
  const { success, failure } = start('download', { repo, branch, path })
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
