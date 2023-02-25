import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { start } from '../../libs/logger'
import { hashPass } from '../../libs/passport'
import { prisma } from '../../prisma'

export type Req = Request<ParamsDictionary, unknown, { username: string; password: string }>

export async function postUser(req: Req, res: Response): Promise<void> {
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
