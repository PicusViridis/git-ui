import { MoreThan } from 'typeorm'
import { Issue } from '../../models/Issue'
import { Release } from '../../models/Release'
import { Request, Response } from '../../types'

type Req = Request<{ repo: string }>

export async function getBoard(req: Req, res: Response): Promise<void> {
  const { repo } = req.params
  const release = await Release.repository.findOne({
    where: { repo, dueDate: MoreThan(new Date().toISOString()) },
    order: { dueDate: 'ASC' },
  })
  const issues = await Issue.repository.find({ where: { repo, release }, order: { priority: 'ASC' } })
  res.render('Board/Board', { release, issues })
}
