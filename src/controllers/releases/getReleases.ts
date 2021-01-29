import { Request, Response } from 'express'
import { Release } from '../../models/Release'

export type Req = Request<{ repo: string }>

export async function getReleases(req: Req, res: Response): Promise<void> {
  const { repo } = req.params
  const releases = await Release.getRepository().find({ where: { repo }, order: { dueDate: 'ASC' } })
  res.render('Releases/Releases', { releases })
}
