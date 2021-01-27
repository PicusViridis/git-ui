import { Issue } from '../../models/Issue'
import { Request, Response } from '../../types'

type Req = Request<{ repo: string; id: number }>

export async function deleteIssue(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Issue.getRepository().delete(id)
  res.redirect(`/repo/${repo}/issues/list`)
}
