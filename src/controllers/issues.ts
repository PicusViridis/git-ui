import { Request, Response } from 'express'
import { MoreThan } from 'typeorm'
import { Issue } from '../models/Issue'
import { Release } from '../models/Release'
import { User } from '../models/User'

type P = { repo: string }
type I = { id?: number }

export async function getIssues(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const issues = await Issue.getRepository().find({
    where: { repo },
    order: { updatedAt: 'DESC' },
    relations: ['release', 'author'],
  })
  res.render('Issues/Issues', { issues })
}

export async function getIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id, repo } = req.params
  const releases = await Release.getRepository().find({ where: { repo, dueDate: MoreThan(new Date().toISOString()) } })
  const issue = !id ? undefined : await Issue.getRepository().findOne(id, { relations: ['release'] })
  res.render('Issues/Issue', { issue, releases })
}

export async function saveIssue(req: Request<P & I> & { user: User }, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { title, type, description, release } = req.body
  if (id) {
    await Issue.getRepository().update(id, { title, type, description, release })
  } else {
    const author = { id: req.user.id }
    const result = await Issue.getRepository().findOne({ where: { release }, order: { priority: 'DESC' } })
    const priority = result ? result.priority + 1 : 0
    await Issue.getRepository().save({ repo, title, type, description, author, release, priority })
  }
  res.redirect(`/repo/${repo}/issues/list`)
}

export async function moveIssue(req: Request<I>, res: Response): Promise<void> {
  const { id } = req.params
  const { status, priority } = req.body
  await Issue.getRepository().update(id, { status, priority })
  res.sendStatus(204)
}

export async function deleteIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Issue.getRepository().delete(id)
  res.redirect(`/repo/${repo}/issues/list`)
}
