import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { start } from '../../libs/logger'
import { User } from '../../models/User'

export async function getUsers(req: Request, res: Response): Promise<void> {
  const { success, failure } = start('get_users')
  try {
    const users = await getRepository(User).find({ order: { username: 'ASC' } })
    res.json(users)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
