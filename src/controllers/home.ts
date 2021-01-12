import { Request, Response } from 'express'
import { RepositoryService } from '../libs/repositories'

export async function getHome(req: Request, res: Response): Promise<void> {
  const repositories = await RepositoryService.listRepositories()
  res.render('Home', { repositories })
}
