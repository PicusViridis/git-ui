import { RepositoryService } from '../../libs/repositories'
import { Request, Response } from '../../types'

type Res = Response<string, { repo: string; branch: string; path: string }>

export async function downloadFile(req: Request, res: Res): Promise<void> {
  const { repo, branch, path } = res.locals
  const filename = path.split('/').pop()
  const stream = await RepositoryService.getStream(repo, path, branch)
  res.set('Content-Disposition', `attachment; filename=${filename}`)
  res.send(stream)
}
