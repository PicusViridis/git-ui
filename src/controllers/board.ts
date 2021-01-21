import { Request, Response } from 'express'
import { Issue } from '../models/Issue'

type P = { repo: string }

export async function getBoard(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const issues = await Issue.getRepository()
    .createQueryBuilder('issue')
    .leftJoinAndSelect('issue.release', 'release')
    .where('release.repo = :repo', { repo })
    .orderBy('issue.updatedAt', 'DESC')
    .getMany()
  res.render('Board/Board', { issues })
}
