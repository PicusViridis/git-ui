import { Request, Response } from '../../types'

export async function addUser(req: Request, res: Response): Promise<void> {
  res.render('Users/User', { title: 'Add user' })
}
