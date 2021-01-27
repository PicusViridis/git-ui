import { Request, Response } from 'express'
import { Release } from '../models/Release'

type P = { repo: string }
type I = { id?: number }

export async function getReleases(req: Request<P>, res: Response): Promise<void> {
  const { repo } = req.params
  const releases = await Release.getRepository().find({ where: { repo }, order: { dueDate: 'ASC' } })
  res.render('Releases/Releases', { releases })
}

export async function getRelease(req: Request<P & I>, res: Response): Promise<void> {
  const { id } = req.params
  if (!id) {
    res.render('Releases/Release')
  } else {
    const release = await Release.getRepository().findOne(id, { relations: ['issues'] })
    res.render('Releases/Release', { release })
  }
}

export async function saveRelease(req: Request<P & I>, res: Response): Promise<void> {
  const { id, repo } = req.params
  const { name, dueDate } = req.body
  if (id) {
    await Release.getRepository().update(id, { name, dueDate: new Date(dueDate) })
  } else {
    await Release.getRepository().save({ repo, name, dueDate: new Date(dueDate + 'T00:00:00.000Z') })
  }
  res.redirect(`/repo/${repo}/releases/list`)
}

export async function deleteRelease(req: Request<P & I>, res: Response): Promise<void> {
  const { id, repo } = req.params
  await Release.getRepository().delete(id)
  res.redirect(`/repo/${repo}/releases/list`)
}
