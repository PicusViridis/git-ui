import { RepositoryService } from '../../libs/repositories'
import { Request, Response } from '../../types'

export async function getHome(req: Request, res: Response): Promise<void> {
  const repositories = await RepositoryService.listRepositories()
  res.render('Home/Home', { repositories })
}
