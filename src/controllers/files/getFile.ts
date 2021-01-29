import { Request, Response } from 'express'
import { RepositoryService } from '../../libs/repositories'

type Res = Response<string, { repo: string; branch: string; path: string }>

export async function getFile(req: Request, res: Res): Promise<void> {
  const { repo, branch, path } = res.locals
  const type = await RepositoryService.getFileType(repo, path, branch)
  if (type === 'file') {
    const content = await RepositoryService.getContent(repo, path, branch)
    const size = await RepositoryService.getSize(repo, path, branch)
    res.render('Files/File', { content, size })
  } else {
    const files = await RepositoryService.getFiles(repo, path, branch)
    res.render('Files/Files', { files })
  }
}
