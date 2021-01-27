import { Release } from '../../models/Release'
import { Request, Response } from '../../types'

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
    await Release.getRepository().update(id, { name, dueDate: new Date(dueDate) })
  } else {
    await Release.getRepository().save({ repo, name, dueDate: new Date(dueDate + 'T00:00:00.000Z') })
  }
  res.redirect(`/repo/${repo}/releases/list`)
}
