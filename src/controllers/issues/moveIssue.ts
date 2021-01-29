import { Request, Response } from 'express'
import { updatePriority } from '../../libs/issuePriority'
import { Issue, Status } from '../../models/Issue'

type Req = Request<{ id: number }, unknown, { status: Status; priority: number }>

export async function moveIssue(req: Req, res: Response): Promise<void> {
  const { id } = req.params
  const { status, priority } = req.body
  await updatePriority(id, priority)
  await Issue.repository.update(id, { status, priority })
  res.sendStatus(204)
}
