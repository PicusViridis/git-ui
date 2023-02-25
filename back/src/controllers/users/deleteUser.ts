import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { start } from '../../libs/logger'
import { User } from '../../models/User'

export type Req = Request<{ username: string }>

export async function deleteUser(req: Req, res: Response): Promise<void> {
  const { username } = req.params
  const { success, failure } = start('delete_user', { username })
  try {
    await getRepository(User).delete({ username })
    res.sendStatus(204)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
