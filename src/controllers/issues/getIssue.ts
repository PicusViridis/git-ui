import { Request, Response } from 'express'
import { MoreThan } from 'typeorm'
import { Issue } from '../../models/Issue'
import { Release } from '../../models/Release'

export type Req = Request<{ repo: string; id: string }>

export async function getIssue(req: Req, res: Response): Promise<void> {
  const { id } = req.params
  if (id) {
    await editIssue(req, res)
  } else {
    await addIssue(req, res)
  }
}

export async function addIssue(req: Req, res: Response): Promise<void> {
  const { repo } = req.params
  const releases = await Release.getRepository().find({ where: { repo, dueDate: MoreThan(new Date().toISOString()) } })
  res.render('Issues/Issue', { releases })
}

export async function editIssue(req: Req, res: Response): Promise<void> {
  const { id, repo } = req.params
  const issue = await Issue.getRepository().findOne(id, { relations: ['release', 'attachments'] })
  if (!issue) {
    return res.render('404')
  }
  const dueDate = MoreThan(new Date().toISOString())
  const releases = await Release.getRepository().find({ where: { repo, dueDate } })
  if (releases.findIndex((r) => r.id === issue.release.id) === -1) {
    releases.push(issue.release)
  }
  res.render('Issues/Issue', { issue, releases })
}
