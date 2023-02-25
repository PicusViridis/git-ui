import { Request, Response } from 'express'
import { start } from '../../libs/logger'
import { prisma } from '../../prisma'

export type Req = Request<{ id: string }>

export async function deleteUser(req: Req, res: Response): Promise<void> {
  const { id } = req.params
  const { success, failure } = start('delete_user', { id })
  try {
    await prisma.user.delete({ where: { id: Number(id) } })
    res.sendStatus(204)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
