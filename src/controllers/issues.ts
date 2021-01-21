import { Request, Response } from 'express'
import { MoreThan } from 'typeorm'
import { Issue } from '../models/Issue'
import { Release } from '../models/Release'
import { User } from '../models/User'

type P = { repo: string }
type I = { id?: number }

export async function getIssues(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const issues = await Issue.getRepository()
    .createQueryBuilder('issue')
    .leftJoinAndSelect('issue.release', 'release')
    .leftJoinAndSelect('issue.author', 'author')
    .where('release.repo = :repo', { repo })
    .orderBy('issue.updatedAt', 'DESC')
    .getMany()
  res.render('Issues/Issues', { issues })
}

export async function getIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id } = req.params
  const releases = await Release.getRepository().find({ where: { dueDate: MoreThan(new Date()) } })
  if (!id) {
    res.render('Issues/Issue', { releases })
  } else {
    const issue = await Issue.getRepository().findOne(id, { relations: ['release'] })
    res.render('Issues/Issue', { issue, releases })
  }
}

export async function saveIssue(req: Request<P & I> & { user: User }, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { title, type, description, release } = req.body
  if (id) {
    await Issue.getRepository().update(id, { title, type, description, release })
  } else {
    const author = { id: req.user.id }
    await Issue.getRepository().save({ title, type, description, author, release })
  }
  res.redirect(`/repo/${repo}/issues/list`)
}

export async function deleteIssue(req: Request<P & I>, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Issue.getRepository().delete(id)
  res.redirect(`/repo/${repo}/issues/list`)
}
