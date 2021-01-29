import { Request, Response } from 'express'
import { Release } from '../../models/Release'

export type Req = Request<{ repo: string; id: string }>

export async function deleteRelease(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Release.getRepository().delete(id)
  res.redirect(`/repo/${repo}/releases/list`)
}
