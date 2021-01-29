import { Request, Response } from 'express'
import { Release } from '../../models/Release'

type Req = Request<{ repo: string; id: number }>

export async function deleteRelease(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Release.getRepository().delete(id)
  res.redirect(`/repo/${repo}/releases/list`)
}
