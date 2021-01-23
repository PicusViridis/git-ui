import { Request, Response } from 'express'
import { MoreThan } from 'typeorm'
import { Issue } from '../models/Issue'
import { Release } from '../models/Release'

type P = { repo: string }

export async function getBoard(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const release = await Release.getRepository().findOne({
    where: { repo, dueDate: MoreThan(new Date().toISOString()) },
    order: { dueDate: 'ASC' },
  })
  const issues = await Issue.getRepository().find({ where: { repo, release }, order: { priority: 'ASC' } })
  res.render('Board/Board', { release, issues })
}
