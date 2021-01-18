import { Request, Response } from 'express'
import { Issue } from '../models/Issue'

type P = { repo: string }
type I = { id: number }

export async function getIssues(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const issues = await Issue.getRepository().find({ where: { repo }, order: { updatedAt: 'DESC' } })
  res.render('Issues/Issues', { issues })
}

export async function addIssue(req: Request<P>, res: Response): Promise<void> {
  res.render('Issues/Issue')
}

export async function postIssue(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const { title, type, description, author, release } = req.body
  await Issue.getRepository().save({ repo, title, type, description, author, release })
  res.redirect('/issues')
}

export async function getIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id } = req.params
  const issue = Issue.getRepository().findOne(id)
  res.render('Issues/Issue', { issue })
}

export async function putIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id } = req.params
  const { title, type, description, author, release } = req.body
  await Issue.getRepository().update(id, { title, type, description, author, release })
  res.redirect(`/issues/${id}`)
}

export async function deleteIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id } = req.params
  await Issue.getRepository().delete(id)
  res.redirect('/issues')
}
