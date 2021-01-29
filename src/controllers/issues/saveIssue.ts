import { Request, Response } from 'express'
import { Issue, Type } from '../../models/Issue'

export type Req = Request<
  { repo: string; id: string },
  unknown,
  { title: string; type: Type; description: string; release: number }
>

export async function saveIssue(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { title, type, description, release } = req.body
  await Issue.getRepository().update({ release: { id: release } }, { priority: () => 'priority + 1' })
  if (id) {
    await Issue.getRepository().update(id, { title, type, description, release: { id: release } })
  } else {
    const author = { id: req.user?.id }
    await Issue.getRepository().save({ repo, title, type, description, author, release: { id: release } })
  }
  res.redirect(`/repo/${repo}/issues/list`)
}
