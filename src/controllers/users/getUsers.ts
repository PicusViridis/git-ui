import { User } from '../../models/User'
import { Request, Response } from '../../types'

export async function getUsers(req: Request, res: Response): Promise<void> {
  const users = await User.repository.find({ order: { username: 'ASC' } })
  res.render('Users/Users', { users, title: 'Users' })
}
