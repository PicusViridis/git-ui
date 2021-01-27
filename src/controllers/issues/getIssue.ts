import { MoreThan } from 'typeorm'
import { Issue } from '../../models/Issue'
import { Release } from '../../models/Release'
import { Request, Response } from '../../types'

type Req = Request<{ repo: string; id?: number }>

export async function getIssue(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  const releases = await Release.getRepository().find({ where: { repo, dueDate: MoreThan(new Date().toISOString()) } })
  const issue = !id ? undefined : await Issue.getRepository().findOne(id, { relations: ['release'] })
  res.render('Issues/Issue', { issue, releases })
}
