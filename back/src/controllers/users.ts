import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { start } from '../libs/logger'
import { hashPass } from '../libs/passport'
import { prisma } from '../prisma'

export async function getUsers(req: Request, res: Response): Promise<void> {
  const { success, failure } = start('get_users')
  try {
    const users = await prisma.user.findMany({ orderBy: { username: 'asc' } })
    res.json(users)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export type Req1 = Request<ParamsDictionary, unknown, { username: string; password: string }>

export async function postUser(req: Req1, res: Response): Promise<void> {
  const { username, password } = req.body
  const { success, failure } = start('post_user', { username })
  try {
    const user = await prisma.user.create({
      data: { username, password: hashPass(password) },
    })
    res.status(201).json(user.id)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}

export type Req2 = Request<{ id: string }>

export async function deleteUser(req: Req2, res: Response): Promise<void> {
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
