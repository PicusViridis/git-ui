import { Request, Response } from 'express'
import { User } from '../../models/User'

type Req = Request<{ username: string }>

export async function deleteUser(req: Req, res: Response): Promise<void> {
  const { username } = req.params
  await User.repository.delete(username)
  res.redirect('/users/list')
}
