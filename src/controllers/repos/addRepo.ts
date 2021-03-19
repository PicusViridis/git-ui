import { Request, Response } from 'express'

export async function addRepo(req: Request, res: Response): Promise<void> {
  res.render('Repos/Repo', { title: 'Add repository' })
}
