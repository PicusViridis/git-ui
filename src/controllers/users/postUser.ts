import sha256 from 'crypto-js/sha256'
import { User } from '../../models/User'
import { Request, Response } from '../../types'

type Req = Request<unknown, unknown, { username: string; password: string }>

export async function postUser(req: Req, res: Response): Promise<void> {
  const { username, password } = req.body
  await User.repository.save({ username, password: sha256(password).toString() })
  res.redirect('/users/list')
}
