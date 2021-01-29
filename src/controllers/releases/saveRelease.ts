import { Request, Response } from 'express'
import { Release } from '../../models/Release'

type Req = Request<
  { repo: string; id?: number },
  unknown,
  { name: string; dueDate: string },
  unknown,
  Record<string, unknown>
>

export async function saveRelease(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { name, dueDate } = req.body
  if (id) {
    await Release.repository.update(id, { name, dueDate: new Date(dueDate) })
  } else {
    await Release.repository.save({ repo, name, dueDate: new Date(dueDate + 'T00:00:00.000Z') })
  }
  res.redirect(`/repo/${repo}/releases/list`)
}
