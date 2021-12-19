import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { getRepository } from 'typeorm'
import { start } from '../../libs/logger'
import { hashPass } from '../../libs/passport'
import { User } from '../../models/User'

export type Req = Request<ParamsDictionary, unknown, { username: string; password: string }>

export async function postUser(req: Req, res: Response): Promise<void> {
  const { username, password } = req.body
  const { success, failure } = start('post_user', { username })
  try {
    await getRepository(User).save({ username, password: hashPass(password) })
    res.sendStatus(201)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
