import { updateRelease } from '../../libs/issuePriority'
import { Issue, Type } from '../../models/Issue'
import { Request, Response } from '../../types'

type Req = Request<
  { repo: string; id?: number },
  unknown,
  { title: string; type: Type; description: string; release: number }
>

export async function saveIssue(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { title, type, description, release } = req.body
  if (id) {
    await updateRelease(id, release)
    await Issue.repository.update(id, { title, type, description, release: { id: release } })
  } else {
    const author = { id: req.user?.id }
    const result = await Issue.repository.findOne({
      where: { release: { id: release } },
      order: { priority: 'DESC' },
    })
    const priority = result ? result.priority + 1 : 0
    await Issue.repository.save({ repo, title, type, description, author, release: { id: release }, priority })
  }
  res.redirect(`/repo/${repo}/issues/list`)
}
