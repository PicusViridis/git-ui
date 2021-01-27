import { updatePriority } from '../../libs/issuePriority'
import { Issue, Status } from '../../models/Issue'
import { Request, Response } from '../../types'

type Req = Request<{ id: number }, unknown, { status: Status; priority: number }>

export async function moveIssue(req: Req, res: Response): Promise<void> {
  const { id } = req.params
  const { status, priority } = req.body
  await updatePriority(id, priority)
  await Issue.getRepository().update(id, { status, priority })
  res.sendStatus(204)
}
