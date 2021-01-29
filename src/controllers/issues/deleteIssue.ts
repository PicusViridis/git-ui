import { Request, Response } from 'express'
import { Issue } from '../../models/Issue'

type Req = Request<{ repo: string; id: number }>

export async function deleteIssue(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Issue.getRepository().delete(id)
  res.redirect(`/repo/${repo}/issues/list`)
}
