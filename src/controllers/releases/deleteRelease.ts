import { Release } from '../../models/Release'
import { Request, Response } from '../../types'

type Req = Request<{ repo: string; id: number }>

export async function deleteRelease(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Release.getRepository().delete(id)
  res.redirect(`/repo/${repo}/releases/list`)
}
